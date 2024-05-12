// Import necessary modules and dependencies
import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user_schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  // Inject the User model and JwtService in the constructor
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) { }

  // User registration method
  async register(createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;

      // Check if a user with the same email already exists
      const foundUser = await this.userModel.findOne({ email })
      if (foundUser) {
        throw new UnauthorizedException('There is a user with the same email!');
      }

      // Hash the user's password before saving it to the database
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Create a new user instance with the hashed password
      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });

      // Save the user to the database
      const savedUser = await createdUser.save()
        .catch(err => {
          console.log(err);
          // Handle unique constraint violation for phone number
          if (err && err.code == 11000) {
            throw new BadRequestException('There is a user with the same phone number!')
          } else {
            throw new InternalServerErrorException('Unexpected error while creating the user')
          }
        });

      // Generate a JWT token for the user
      const token = this.generateToken(savedUser, { expiresIn: '1d' });

      // Return the token and user ID
      return { token, id: savedUser._id };

    } catch (error) {
      if (error instanceof HttpException) throw error
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!')
    }
  }

  // Retrieve a list of users with optional pagination
  async findAll(query) {
    try {
      const params = {
        _limit: 3,
        _offset: 0
      }
      const currentPage = +(query.page) || 1

      // Adjust limit and offset based on query parameters
      if (query.limit) {
        params._limit = +query.limit;
      }

      if (currentPage > 1) {
        params._offset = ((currentPage - 1) * (params._limit)) || 0;
      }

      // Fetch users from the database with limit and offset
      const foundUsers = await this.userModel.find()
        .limit(params._limit)
        .skip(params._offset)
        .catch(err => {
          console.log(err);
          throw new InternalServerErrorException('Unexpected error while returning user list')
        });

      // Modify user properties before returning the result
      if (foundUsers) {
        for (let i = 0; i < foundUsers.length; i++) {
          foundUsers[i].password = undefined;
        }
        for (let i = 0; i < foundUsers.length; i++) {
          if (foundUsers[i].marketingConsent == true) {
            continue;
          } else {
            foundUsers[i].email = undefined;
          }
        }
        return { foundUsers }
      }
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!')
    }
  }

  // Retrieve a user by ID
  async findOne(id: string) {
    try {
      // Validate the provided ID
      const idValid = mongoose.isValidObjectId(id)
      if (!idValid) throw new BadRequestException('Please enter correct Id')

      // Find the user by ID
      const foundUser = await this.userModel.findById(id).catch(err => {
        console.log(err)
        throw new NotFoundException('This user doesnt exist')
      })

      // Modify user properties before returning the result
      foundUser.password = undefined;
      if (foundUser.marketingConsent == false) {
        foundUser.email = undefined;
      }
      return foundUser;

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!')
    };
  }

  // Retrieve a user by email
  async findOneWithEmail(email: string) {
    return await this.userModel.findOne({ email }).lean().exec().catch(err => {
      console.log(err)
      throw new NotFoundException('This user doesnt exist')
    })
  }

  // Update a user's information
  async update(updateUserDto: UpdateUserDto) {
    try {
      const { currentId, updateId, ...data } = updateUserDto

      // Find the user to be updated
      const user = await this.userModel.findById(currentId).catch(err => {
        console.log(err)
        throw new NotFoundException('This user doesnt exist')
      })

      // Check if the user has the permission to update
      if (updateId === currentId || user.role == 'admin') {

        // Update the user and retrieve the updated user
        const updatedUser = await this.userModel.findByIdAndUpdate(updateId, data, { new: true }).catch(err => {
          console.log(err)
          throw new InternalServerErrorException('Unexpected error while updating user')
        })

        // Modify user properties before returning the result
        updatedUser.password = undefined;
        if (updatedUser.marketingConsent == false) {
          updatedUser.email = undefined;
        }
        return updatedUser;
      } else {
        throw new UnauthorizedException('You cant update users if you are not an admin or the user him/herself')
      }

    } catch (error) {
      if (error instanceof HttpException) throw error
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!')
    }
  }

  // Remove a user by ID
  async remove(userId: string, deleteId: string) {
    try {
      // Find the user making the request
      const user = await this.userModel.findById(userId).catch(err => {
        console.log(err)
        throw new NotFoundException('This user doesnt exist')
      })

      // Check if the user has the permission to delete
      if (!user) throw new NotFoundException('This user doesnt exist')
      if (user.role == 'admin' || userId == deleteId) {
        // Delete the user and retrieve the deleted user
        const deletedUser = this.userModel.findByIdAndDelete(deleteId).catch(err => {
          console.log(err)
          throw new InternalServerErrorException('Unexpected error while deleting user')
        })

        // Check if the user was successfully deleted
        if (!deletedUser) {
          throw new NotFoundException('User to delete not found');
        }
        return 'User Deleted Successfully'
      } else {
        throw new UnauthorizedException('You dont have the permission to delete this user')
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened while deleting the user')
    }
  }

  private generateToken(user: UserDocument, options?: any): string {

    const payload = { sub: user._id, email: user.email };
    return this.jwtService.sign(payload, { secret: process.env.SECRET });
  }

}

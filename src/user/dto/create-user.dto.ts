import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsEnum, IsEmail, IsBoolean } from 'class-validator';
import { UserRole } from '../schemas/user_schema';

export class CreateUserDto {
    // Required: The first name of the user (string between 6 and 25 characters)
    @IsNotEmpty({ message: 'A user must have a firstName' })
    @IsString({ message: 'A user must have a string firstName' })
    @MinLength(3, { message: 'A user firstName must be 6 characters minimum' })
    @MaxLength(25, { message: 'A user firstName must be 25 characters maximum' })
    firstName: string;

    // Required: The last name of the user (string between 6 and 25 characters)
    @IsNotEmpty({ message: 'A user must have a lastName' })
    @IsString({ message: 'A user must have a string lastName' })
    @MinLength(3, { message: 'A user lastName must be 6 characters minimum' })
    @MaxLength(25, { message: 'A user lastName must be 25 characters maximum' })
    lastName: string;

    // Required: The marketing consent status of the user (boolean)
    @IsNotEmpty({ message: 'A user must have a boolean marketing consent' })
    @IsBoolean({ message: 'A user must have a boolean marketing consent' })
    marketingConsent: boolean;

    // Required: The password of the user (string between 6 and 25 characters)
    @IsNotEmpty({ message: 'A user must have a password' })
    @IsString({ message: 'A user must have a string password' })
    @MinLength(6, { message: 'A user password must be 6 characters minimum' })
    @MaxLength(25, { message: 'A user password must be 25 characters maximum' })
    password: string;

    // Required and unique: The email of the user
    @Prop({ required: true, unique: true })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string;

    // Required: The role of the user (enum)
    @Prop({ required: true })
    @IsNotEmpty({ message: 'A user must have a role' })
    @IsEnum(UserRole, { message: 'Invalid user role' })
    role: UserRole;
}

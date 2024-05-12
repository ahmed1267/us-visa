import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Res, Redirect, Request, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) { }

  // Register a new user
  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  // Login route (redirects to /auth/login)
  @Post('login')
  @UsePipes(ValidationPipe)
  @Redirect('/auth/login')
  async login(@Request() req) { }

  // Get all users (requires JWT authentication)
  @UseGuards(JwtGuard)
  @Get()
  findAll(@Query() query: ExpressQuery) {
    return this.userService.findAll(query);
  }

  // Get a specific user by ID (requires JWT authentication)
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // Update user information (requires JWT authentication)
  @UseGuards(JwtGuard)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  // Remove a user by ID (requires JWT authentication)
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') userId: string, @Body('id') deleteId: string) {
    return this.userService.remove(userId, deleteId);
  }
}

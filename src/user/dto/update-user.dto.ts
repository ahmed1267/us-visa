import { IsOptional, IsString, IsBoolean, IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { UserRole } from '../schemas/user_schema';

export class UpdateUserDto {
    // Optional: The first name of the user
    @IsOptional()
    @IsString({ message: 'A user must have a string firstName' })
    @MinLength(3, { message: 'A user firstName must be 6 chracters minimum' })
    @MaxLength(25, { message: 'A user firstName must be 25 chracters maximum' })
    firstName?: string;

    // Optional: The last name of the user
    @IsOptional()
    @IsString({ message: 'Users last name must be lastName!' })
    @MinLength(3, { message: 'A user lastName must be 6 chracters minimum' })
    @MaxLength(25, { message: 'A user lastName must be 25 chracters maximum' })
    lastName?: string;

    // Not optional: The ID of the user to be updated
    @IsNotEmpty({ message: 'Please send the ID of the user you want to update' })
    @IsString()
    currentId: string;

    // Not optional: The ID of the user to be updated
    @IsNotEmpty({ message: 'Please send the ID of the user you want to update' })
    @IsString()
    updateId: string;

    // Optional: The password of the user
    @IsOptional()
    @IsString({ message: 'A user must have a string password' })
    @MinLength(6, { message: 'A user password must be 6 chracters minimum' })
    @MaxLength(25, { message: 'A user password must be 25 chracters maximum' })
    password?: string;

    // Optional: The role of the user (enum)
    @IsOptional()
    @IsEnum(UserRole, { message: 'Invalid user role' })
    role?: UserRole;

    // Optional: The email of the user
    @IsOptional()
    @IsString({ message: 'Invalid email' })
    email?: string;

    // Optional: The marketing consent of the user (boolean)
    @IsBoolean({ message: 'User marketing consent must be a boolean value!' })
    @IsOptional()
    marketingConsent?: boolean;
}

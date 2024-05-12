import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email', // Define the field to be used as the username (email in this case)
            passwordField: 'password', // Define the field to be used as the password
        });
    }

    // Method called to validate the user's credentials
    async validate(username: string, password: string) {
        // Validate the user using the AuthService's validateUser method
        const user = await this.authService.validateUser(username, password).catch(err => {
            // Catch any errors during validation and throw an UnauthorizedException
            throw new UnauthorizedException('Username or Password isn\'t correct');
        });

        // If the user is not found, throw an UnauthorizedException
        if (!user) {
            throw new UnauthorizedException();
        }

        // Return the validated user
        return user;
    }
}

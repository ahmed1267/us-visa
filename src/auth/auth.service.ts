import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schemas/user_schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) { }

    // Validate user credentials during login
    async validateUser(email: string, password: string) {
        const user = await this.userService.findOneWithEmail(email);

        // Check if user exists and the provided password is correct
        if (user && await bcrypt.compare(password, user.password)) {
            // Exclude password from the result before returning
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    // Generate JWT tokens during successful login
    async login(user: User) {
        const payload = {
            username: user.email,
            sub: {
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };

        // Exclude password from the user before creating tokens
        user.password = undefined;

        return {
            ...user,
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '1d' }),
        };
    }

    // Refresh the access token using the refresh token
    async refreshToken(user: User) {
        const payload = {
            username: user.email,
            sub: {
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };

        // Generate a new access token using the refresh token
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}

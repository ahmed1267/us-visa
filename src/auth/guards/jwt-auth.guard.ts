import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    // Method to check if the request can be activated
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Get the request from the execution context
        const request = context.switchToHttp().getRequest<Request>();

        // Extract the token from the Authorization header
        const token = request.headers.authorization.split(' ')[1];

        // Validate the token
        const isValidToken = await this.validate(token);

        // If the token is not valid, return false
        if (!isValidToken) return false;

        // Decode the token and add userId and username to the request body
        const decodedToken = this.decodeToken(token);
        request.body.userId = decodedToken.userId;
        request.body.username = decodedToken.username;

        // Return true to indicate that the request can be activated
        return true;
    }

    // Method to validate the JWT token
    async validate(token: string) {
        return await this.jwtService.verifyAsync(token);
    }

    // Method to decode the JWT token and extract userId and username
    private decodeToken(token: string) {
        return this.jwtService.decode<{ userId: string, username: string }>(token);
    }
}

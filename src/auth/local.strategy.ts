import { Injectable, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      { usernameField: 'email' }
    );
  }

  async validate(email: string, password: string) {
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) {
      return new UnprocessableEntityException()
    }
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
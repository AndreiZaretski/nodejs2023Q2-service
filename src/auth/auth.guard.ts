import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { Observable } from 'rxjs';

const skipPaths = [
  /^\/auth\/signup$/,
  /^\/auth\/login$/,
  /^\/auth\/refresh$/,
  /^\/doc$/,
  /^\/$/,
];

@Injectable()
export class AuthGuard implements CanActivate {
  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   return true;
  // }
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //throw new Error();
    const request = context.switchToHttp().getRequest();
    const path = request.path;
    for (const regex of skipPaths) {
      if (regex.test(path)) {
        return true;
      }
    }
    //const token = this.extractTokenFromHeader(request);
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' && !token) {
      throw new UnauthorizedException('User is not authorized');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('User is not authorized');
    }
    return true;
  }

  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers['authorization']?.split(' ') ?? [];
  //   return type === 'Bearer' ? token : undefined;
  // }
}

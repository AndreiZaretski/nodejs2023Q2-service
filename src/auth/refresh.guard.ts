import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RefreshGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //throw new Error();
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    if (!body || typeof body.refreshToken !== 'string') {
      throw new UnauthorizedException(
        'User is not authorized. Hello from guard!',
      );
    }

    if (Object.keys(body).length > 1) {
      throw new BadRequestException('Body request contains extra fields');
    }
    return true;
  }
}

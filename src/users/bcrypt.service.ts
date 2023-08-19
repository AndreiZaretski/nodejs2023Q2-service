import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private cryptSalt = parseInt(process.env.CRYPT_SALT ?? '10') || 10;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.cryptSalt);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

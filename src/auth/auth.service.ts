
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, pass: string): Promise<string> {
    const user = await this.usersService.findOne(email);

    if (!await bcrypt.compare(user?.password, await this.hash(pass))) {
      throw new UnauthorizedException();
    }
    
    return randomBytes(64).toString('hex');
  }

  async signUp(email: string, pass: string): Promise<any> {

  }

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }
}

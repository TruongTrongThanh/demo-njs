import { IsEmail, IsNotEmpty } from 'class-validator';
import { MatchField } from './match-field.validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @MatchField('password')
  confirmPassword: string;
}
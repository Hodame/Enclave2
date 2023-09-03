import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(4)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}

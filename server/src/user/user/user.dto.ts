import { Employees } from "@prisma/client";
import { IsDate, IsEmail, IsISO8601, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddUserDto {
  @IsString()
  department_id: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsISO8601()
  @IsNotEmpty()
  birthday: Date;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  CIN: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zip: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  job: string;

  photo?: Express.Multer.File;
}
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  department_id?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  CIN?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  job?: string;
  
  @IsOptional()
  photo: Express.Multer.File;

}
export class DeleteUserDto {
    user_id: string;
  }
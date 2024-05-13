import { Year } from '@prisma/client';
import { Type } from 'class-transformer/types/decorators/type.decorator';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsISO8601,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  department_id: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  birthday: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  marital_status: string;

  @IsString()
  @IsNotEmpty()
  cin: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsString()
  zip: string;

  @IsString()
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

  @IsString()
  @IsNotEmpty()
  role_id: string;

  @IsString()
  @IsNotEmpty()
  salary: string;
}

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  department_id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  birthday: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  marital_status: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cin: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  zip: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  job: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  role_id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  salary: string;

  @IsOptional()
  @IsString({ each: true })
  skills: string[];

  @IsOptional()
  @IsString()
  last_opened: Date;
}

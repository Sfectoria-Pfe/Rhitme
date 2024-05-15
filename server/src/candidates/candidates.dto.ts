import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateCandidateDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  offer_id: string;

  @IsOptional()
  cv: any;
}

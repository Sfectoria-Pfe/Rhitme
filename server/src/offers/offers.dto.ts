import { IsString, IsArray, IsBoolean } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  summary: string[];

  @IsString({ each: true })
  requirements: string[];

  @IsString()
  experience: string;

  @IsString()
  pay: string;

  @IsString()
  job_type: string;

  @IsString()
  workdays: string;

  @IsBoolean()
  urgent: boolean;
}

export class UpdateOfferDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsArray()
  summary?: string[];

  @IsArray()
  requirements?: string[];

  @IsString()
  experience?: string;

  @IsString()
  pay?: string;

  @IsString()
  job_type?: string;

  @IsString()
  workdays?: string;

  @IsBoolean()
  urgent?: boolean;
}

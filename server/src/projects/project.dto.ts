// create-project.dto.ts
import {
  IsNotEmpty,
  IsDateString,
  IsUUID,
  IsBoolean,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;

  @IsString()
  revenue: string;

  @IsNotEmpty()
  @IsUUID()
  manager: string;

  @IsString()
  client: string;

  @IsBoolean()
  @IsOptional()
  delivered: boolean = false;
}

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  start?: Date;

  @IsString()
  @IsOptional()
  end?: Date;

  @IsString()
  @IsOptional()
  revenue?: string;

  @IsString()
  @IsOptional()
  manager?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  client?: string;

  @IsBoolean()
  @IsOptional()
  delivered?: boolean;
}

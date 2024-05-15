import {
  IsString,
  IsDateString,
  IsUUID,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsUUID()
  project_id: string;

  @IsNotEmpty()
  @IsUUID()
  employee_id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;

  @IsString()
  points: string;

  @IsString()
  status: string;

  @IsBoolean()
  @IsOptional()
  manager_approved?: boolean;

  @IsDateString()
  @IsOptional()
  done_date?: Date;
}

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsNotEmpty()
  @IsUUID()
  employee_id: string;

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
  points?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  manager_approved?: boolean;

  @IsDateString()
  @IsOptional()
  done_date?: Date;
}

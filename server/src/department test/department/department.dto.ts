import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  department_id: string;

  @IsString()
  @IsNotEmpty()
  department_name: string;

  @IsOptional()
  @IsString()
  department_head: string;
}

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  department_name: string;
}

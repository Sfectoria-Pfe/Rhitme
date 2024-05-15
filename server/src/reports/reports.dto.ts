import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  receiverId?: string;
}

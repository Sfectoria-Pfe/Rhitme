import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  conversation_id: string;

  @IsNotEmpty()
  employee_id: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdateMessageDto {
  @IsNotEmpty()
  @IsBoolean()
  seen: boolean;
}

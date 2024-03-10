import { Employees } from "@prisma/client";

export class AddUserDto{
    data: Employees;
}
export class UpdateUserDto{
    data: Employees;
  }
export class DeleteUserDto {
    user_id: string;
  }
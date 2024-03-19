import { Employees } from "@prisma/client";

export class AddUserDto{
  department_id     : string;
  last_name      : string;
  first_name     : string;
  phone_number   : string;
  birthday       : Date
  gender         : string;
  CIN            : string;
  address        : string;
  email          : string;       
  password       : string;
  job            : string;
  // photo          : string;
}
export class UpdateUserDto {
  department_id: string;
  last_name: string;
  first_name: string;
  phone: string;
  gender: string;
  CIN: string;
  address: string;
  email: string;
  password: string;
  job: string;
}
export class DeleteUserDto {
    user_id: string;
  }
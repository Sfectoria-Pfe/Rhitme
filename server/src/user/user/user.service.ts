import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employees } from '@prisma/client';
import { AddUserDto, UpdateUserDto } from './user.dto';
import { MediaService } from 'src/media/media/media.service';
import { CloudinaryService } from 'src/media/media/cloudinary.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Any } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mediaService: MediaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async addUser(addUserDto: AddUserDto): Promise<Employees> {
      const existingEmailUser = await this.prisma.employees.findFirst({
        where: { email: addUserDto.email },
      });
      if (existingEmailUser) {
        throw new ConflictException('Email already in use');
      }

      const existingCINUser = await this.prisma.employees.findFirst({
        where: { CIN: addUserDto.CIN },
      });
      if (existingCINUser) {
        throw new ConflictException('CIN already in use');
      }

      const hashedPassword = await this.hashPassword(addUserDto.password);

      let mediaId: string | null = null;
      if (addUserDto.photo) {
        const imageUrl = await this.cloudinaryService.uploadImage(addUserDto.photo);
        const media = await this.mediaService.createMedia(imageUrl);
        // media.url=imageUrl;
        mediaId = media.media_id;
      }
      else{
        mediaId='0';
      }
      const monthly = await this.prisma.monthly.create({
        data: {
          January: 0,
          February : 0,
          March:0,
          April:0,
          May :0,
          June:0,
          July :0,
          August :0,
          September :0,
          October  :0,
          November :0,
          December :0
        },
    });

    const yearly = await this.prisma.yearly.create({
        data: {
            y2023:0,
            y2024:0,
            y2025:0,
            y2026:0
        },
    });

    const address = await this.prisma.address.create({
        data: {
            street: addUserDto.street,
            city: addUserDto.city,
            state: addUserDto.state,
            zip: addUserDto.zip,
            country: addUserDto.country,
        },
    });

    const monthlyAbs = await this.prisma.absenceMonthly.create({
        data: {
          January: 0,
          February : 0,
          March:0,
          April:0,
          May :0,
          June:0,
          July :0,
          August :0,
          September :0,
          October  :0,
          November :0,
          December :0
        },
    });

    const yearlyAbs = await this.prisma.absenceYearly.create({
        data: {
          y2023:0,
          y2024:0,
          y2025:0,
          y2026:0
        },
    });

    const data= {
      department: { connect: { department_id: addUserDto.department_id } },
      last_name: addUserDto.last_name,
      first_name: addUserDto.first_name,
      phone: addUserDto.phone_number,
      birthday: addUserDto.birthday,
      gender: addUserDto.gender,
      CIN: addUserDto.CIN,
      address: { connect: { address_id: address.address_id } },
      email: addUserDto.email,
      password: hashedPassword,
      job: addUserDto.job,
      created_at: new Date(),
      status: 'active',
      photo: { connect: { media_id: mediaId } },
      MonthlyPoints:{ connect: { month_id: monthly.month_id } },
      YearlyPoints: { connect: { year_id: yearly.year_id } },
      Monthlyabs: { connect: { mabs_id: monthlyAbs.mabs_id } },
      Yearlyabs:{ connect: { yabs_id: yearlyAbs.yabs_id } },
  };
  
    const user = await this.prisma.employees.create({
      data,
    });

    if (user) {
    await this.prisma.notes.create({
      data: {
        Description: `User ${addUserDto.first_name} ${addUserDto.last_name} was added`,
      },
    });
  }
      return user;
  }

  async updateUser(user_id: string, updateUserDto: UpdateUserDto): Promise<Employees> {
    try {
      const existingEmailUser = await this.prisma.employees.findFirst({
        where: { email: updateUserDto.email },
      });
      if (existingEmailUser) {
        throw new ConflictException('Email already in use');
      }
  
      const existingCINUser = await this.prisma.employees.findFirst({
        where: { CIN: updateUserDto.CIN },
      });
      if (existingCINUser) {
        throw new ConflictException('CIN already in use');
      }
      let data: any = {
        ...updateUserDto,
      };

      if (updateUserDto.photo) {
        const imageUrl = await this.cloudinaryService.uploadImage(updateUserDto.photo);
        const media = await this.mediaService.createMedia(imageUrl);
        data.photo = { connect: { media_id: media.media_id } }; // Use connect to link the media ID
      }

      const user = await this.prisma.employees.update({
        where: { user_id },
        data,
      });
        await this.prisma.notes.create({
          data: {
            Description: `User ${updateUserDto.first_name} ${updateUserDto.last_name} was updated`,
          },
        });
      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${user_id} not found`);
      }
      throw error;
    }
  }

  async removeUser(user_id: string): Promise<Employees> {
    const user = await this.prisma.employees.delete({
      where: { user_id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    await this.prisma.notes.create({
      data: {
        Description: `User ${user.first_name} ${user.last_name} was deleted`,
      },
    });
  
    return user;
  }

  async getUserById(id: string): Promise<Employees> {
    const user = await this.prisma.employees.findFirst({
      where: {
        user_id: id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async getAllUsers(): Promise<Employees[]> {
    return this.prisma.employees.findMany();
  }

  async hashPassword(password: string): Promise<string> {
    if (!password) {
      throw new Error('Password is required');
    }
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}

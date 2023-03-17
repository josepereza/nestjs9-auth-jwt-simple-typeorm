import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './Dtos/CreateUser.Dto';
import { LoginUserDto } from '../auth/Dtos/LoginUser.Dto';
import { User } from './Entities/User.entity';
import * as bcrypt from 'bcrypt';
import { JWTpayload } from '../auth/interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private getjwtToken(payload: JWTpayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
 

  //registro
  async Create(createUserDto: CreateUserDto) {
    const { email, password, ...UserData } = createUserDto;

    const user = this.userRepository.create({
      ...UserData,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    const SearchEmail = await this.userRepository.findOneBy({ email });
    if (SearchEmail) {
      throw new BadRequestException(
        `el usuario con el email ${email} ya existe`,
      );
    }

    return {
      ...this.userRepository.save(user),
      token: this.getjwtToken({
        userId: user.id,
        first_name: user.first_name,
        email: user.email,
      }),
    };
  }

  //login
  async Login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const EmailExists = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });
    if (!EmailExists) {
      throw new BadRequestException(`el email ${email} no existe`);
    }

    const comparepassword = await bcrypt.compareSync(
      password,
      EmailExists.password,
    );
    if (!comparepassword) {
      throw new BadRequestException('Las password no coinciden');
    }
    return {
      ...EmailExists,

      token: this.getjwtToken({
        userId: EmailExists.id,
        first_name: EmailExists.first_name,
        email: EmailExists.email,
      }),
    };
  }
}

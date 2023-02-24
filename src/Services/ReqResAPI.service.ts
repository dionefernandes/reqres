import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { ReqResAPIDTO } from '../Dtos/ReqResAPI.dto';
import { ReqResAPIInterface } from '../Interfaces/ReqResAPI.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RabbitMQService } from './RabbitMQ.service';
import * as request from 'request';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ReqResAPIService {
  constructor(
    @InjectModel('reqResAPIModel')
    private readonly reqResAPIModel: Model<ReqResAPIInterface>,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async deleteUserIdAvatar(id: number): Promise<any> {
    const userFound = await this.reqResAPIModel.findOne({ id });

    if (!userFound) {
      console.log(`User with id ${id} not found`);
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (await this.reqResAPIModel.deleteOne({ id })) {
      await this.deleteAvatar(id);
    }

    const mensage = `User with id ${id} deleted successfully`;

    console.log(mensage);

    return { message: mensage };
  }

  async deleteAvatar(id: number): Promise<void> {
    const fileName = `${id}-image.jpg`;
    const dirPath = path.resolve(__dirname, '../../src/Assets/AvatarImg');

    fs.unlink(`${dirPath}/${fileName}`, (err) => {
      if (err) throw err;
    });
  }

  async getUserIdAvatar(id: number): Promise<ReqResAPIDTO> {
    const userFound = await this.reqResAPIModel.findOne({ id });

    if (!userFound) {
      console.log(`User with id ${id} not found`);
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return userFound;
  }

  async getUserId(id: number): Promise<ReqResAPIDTO> {
    const resUser = await axios.get(`https://reqres.in/api/users/${id}`);
    const userId = resUser.data;

    return userId;
  }

  async getUsers(): Promise<ReqResAPIDTO[]> {
    const resUsers = await axios.get('https://reqres.in/api/users');
    const listUsers = resUsers.data;

    const processAvatar = await this.processAvatar(listUsers.data);

    return processAvatar;
  }

  async processAvatar(listUsers: ReqResAPIInterface[]): Promise<any> {
    const users = [];

    for (const user of listUsers) {
      if ((await this.userExist(user.email)) === true) continue;

      const avatarPath = user.avatar.toString();

      const bufferAvatar = await this.bufferAvatar(avatarPath);

      user.avatar = `data:image/jpeg;base64,${bufferAvatar}`;

      await this.saveUser(user);

      users.push(user);
    }

    return users;
  }

  async userExist(email: string): Promise<any> {
    const emailFound = await this.reqResAPIModel.findOne({ email });

    if (emailFound) {
      console.log(`The user with email ${email} has already been registered`);

      return true;
    }

    return false;
  }

  async bufferAvatar(avatarPath: string): Promise<any> {
    const getAvatar = await axios.get(avatarPath, {
      responseType: 'arraybuffer',
    });

    const avatarBuffer = Buffer.from(getAvatar.data, 'binary');

    await this.downloadAvatar(avatarPath);

    return avatarBuffer.toString('base64');
  }

  async downloadAvatar(avatarPath: string): Promise<void> {
    const fileName = path.basename(avatarPath);
    const dirPath = path.resolve(__dirname, '../../src/Assets/AvatarImg');
    const filePath = `${dirPath}/${fileName}`;

    await request(avatarPath)
      .pipe(fs.createWriteStream(filePath))
      .on('close', () => console.log(`Image saved in ${filePath}`))
      .on('error', (err) => console.error(err));
  }

  async saveUser(user: ReqResAPIDTO): Promise<void> {
    const createUser = new this.reqResAPIModel(user);

    const messageSucess = `User with email ${user.email} has been successfully registered`;
    const messageError = `There was a problem trying to register the user with email ${user.email}`;

    if (await createUser.save()) {
      await this.rabbitMQService.sendMessageToQueue(messageSucess);
    } else {
      await this.rabbitMQService.sendMessageToQueue(messageError);
    }
  }
}

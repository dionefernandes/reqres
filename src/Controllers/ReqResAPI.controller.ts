import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReqResAPIService } from '../Services/ReqResAPI.service';

@Controller('api')
export class ReqResAPIController {
  constructor(private readonly reqResAPIService: ReqResAPIService) {}

  @Post('/users')
  async getUsers() {
    return this.reqResAPIService.getUsers();
  }

  @Get('/users/:id')
  async getUserId(@Param('id') id: number) {
    return this.reqResAPIService.getUserId(id);
  }

  @Get('/users/:id/avatar')
  async getUserIdAvatar(@Param('id') id: number) {
    return this.reqResAPIService.getUserIdAvatar(id);
  }

  @Delete('/users/:id/avatar')
  async deleteUserIdAvatar(@Param('id') id: number) {
    return this.reqResAPIService.deleteUserIdAvatar(id);
  }
}

import { Module } from '@nestjs/common';
import { ReqResAPIController } from '../Controllers/ReqResAPI.controller';
import { ReqResAPIService } from '../Services/ReqResAPI.service';
import { MongooseModule } from '@nestjs/mongoose';
import { reqResAPIModel } from '../Models/ReqResAPI.model';
import { RabbitMQModule } from '../Modules/RabbitMQ.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'reqResAPIModel', schema: reqResAPIModel },
    ]),
    RabbitMQModule,
  ],
  controllers: [ReqResAPIController],
  providers: [ReqResAPIService],
  exports: [ReqResAPIService],
})
export class ReqResAPIModule {}

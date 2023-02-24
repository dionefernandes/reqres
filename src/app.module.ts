import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReqResAPIModule } from './Modules/ReqResAPI.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/payeverAPI', {
      useUnifiedTopology: true,
    }),
    ReqResAPIModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

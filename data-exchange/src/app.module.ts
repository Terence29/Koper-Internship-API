import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataExchangeModule } from './data-exchange/data-exchange.module';

@Module({
  imports: [DataExchangeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

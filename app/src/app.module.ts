import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { BlockController } from './block/controllers/block.controller';
import { BlockModule } from './block/block.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [BlockModule, MongooseModule.forRoot(process.env.MONGO_URI)],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('blocks');
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'blocks', method: RequestMethod.GET });
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'blocks', method: RequestMethod.GET },
        { path: 'blocks', method: RequestMethod.POST },
        'blocks/(.*)',
      )
      .forRoutes(BlockController);
  }
}

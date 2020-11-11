import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [StorageModule]
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }    
}

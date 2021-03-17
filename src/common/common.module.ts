import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { StorageModule } from './storage/storage.module';
import { BasicAclModule } from './integrations/basic-acl/basic-acl.module';

@Module({
  imports: [StorageModule, BasicAclModule]
})
export class CommonModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

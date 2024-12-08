import { Module } from '@nestjs/common';
import { OssModuleController } from './oss_module.controller';
import { OssModuleService } from './oss_module.service';


@Module({
  imports: [],
  controllers: [OssModuleController],
  providers: [OssModuleService]
})
export class OssModuleModule {}

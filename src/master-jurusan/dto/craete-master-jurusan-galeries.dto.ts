import { IsString } from 'class-validator';

export class OrgStructureDto {
  @IsString()
  name: string;

  @IsString()
  job_title: string;

  // Note: File handling is done by NestJS, so no need to add `image` in DTO
}
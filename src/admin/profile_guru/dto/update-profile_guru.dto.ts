import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileGuruDto } from './create-profile_guru.dto';

export class UpdateProfileGuruDto extends PartialType(CreateProfileGuruDto) {}

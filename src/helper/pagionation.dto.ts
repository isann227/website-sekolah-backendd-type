import { IsOptional, IsPositive, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsPositive()
  page?: number = 1; // Default to page 1

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  limit?: number = 10; // Default to 10 items per page
}

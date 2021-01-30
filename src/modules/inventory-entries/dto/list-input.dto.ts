import { IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export class ListInput extends PaginationQueryDto {
  @IsString()
  search?: string;
}
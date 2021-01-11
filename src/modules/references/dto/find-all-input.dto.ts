import { IsNumberString, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class FindAllInput extends PaginationQueryDto {
  @IsOptional()
  @IsNumberString()
  readonly cityId?: string;
}

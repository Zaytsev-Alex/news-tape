import {IsOptional, IsPositive} from 'class-validator';
import {Type} from 'class-transformer';

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    take: number;

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    page: number;
}

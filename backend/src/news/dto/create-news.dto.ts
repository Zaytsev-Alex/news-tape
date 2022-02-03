import {IsNotEmpty} from 'class-validator';

export class CreateNewsDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
}

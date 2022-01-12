import {IsNotEmpty} from 'class-validator';

export class UpdateEditorPermissionsDto {
    @IsNotEmpty()
    approve: boolean;
}

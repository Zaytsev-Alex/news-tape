import {Body, Controller, Param, Patch, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {UpdateEditorPermissionsDto} from './dto/update-editor-permissions.dto';
import {IUserView} from './interfaces/IUserView';
import {RolesGuard} from '../auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Patch(':id')
    update(
        @Param('id') requestId: string,
        @Body() updateEditorPermissionsDto: UpdateEditorPermissionsDto,
    ): Promise<IUserView> {
        return this.usersService.updateEditorPermissions(
            +requestId,
            updateEditorPermissionsDto,
        );
    }
}

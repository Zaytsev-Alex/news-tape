import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {LoginUserDto} from './dto/login-user.dto';
import {comparePassword} from '../helpers/passwordHelper';
import {EditorRequestsService} from '../editor-requests/editor-requests.service';
import {UpdateEditorPermissionsDto} from './dto/update-editor-permissions.dto';
import {extractUserView} from '../helpers/utils';
import {IUserView} from './interfaces/IUserView';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly editorRequestsService: EditorRequestsService,
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.findOneByEmail(createUserDto.email);

        if (existingUser) {
            throw new BadRequestException('User with given email already exists.');
        }

        const createdUser = this.usersRepository.create({...createUserDto});
        const savedUser   = await this.usersRepository.save(createdUser);

        if (createUserDto.requestEditor) {
            await this.editorRequestsService.createAndSave({user: savedUser});
        }

        return savedUser;
    }

    async login(loginUserDto: LoginUserDto): Promise<User> {
        const existingUser = await this.findOneByEmail(loginUserDto.email);

        if (
            !existingUser ||
            !comparePassword(loginUserDto.password, existingUser.password)
        ) {
            throw new BadRequestException('Invalid credentials.');
        }

        return existingUser;
    }

    async updateEditorPermissions(
        requestId: number,
        updateEditorPermissions: UpdateEditorPermissionsDto,
    ): Promise<IUserView> {
        const request = await this.editorRequestsService.findOneById(requestId);

        if (!request) {
            throw new BadRequestException('There is no request for given user.');
        }

        if (updateEditorPermissions.approve) {
            await this.giveEditorsPermissions(request.user);
        }

        await this.editorRequestsService.remove(requestId);

        const updatedUser = await this.findOneByEmail(request.user.email);
        return extractUserView(updatedUser);
    }

    async giveEditorsPermissions(user: User): Promise<number> {
        const saveRes = await this.usersRepository.update(user.id, {isAdmin: true});
        return saveRes.affected;
    }

    findOneByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({email});
    }
}

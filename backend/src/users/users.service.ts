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

        const createdUser = await this.usersRepository.create({...createUserDto});

        if (createUserDto.requestEditor) {
            this.editorRequestsService.create({user: createdUser});
        }

        return this.usersRepository.save(createdUser);
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

        if (updateEditorPermissions.approve) {
            await this.giveEditorsPermissions(request.user);
        }

        await this.editorRequestsService.remove(requestId);

        const updatedUser = await this.findOneByEmail(request.user.email);
        return extractUserView(updatedUser);
    }

    giveEditorsPermissions(user: User): Promise<User> {
        const updatedUser = this.usersRepository.create({...user, isAdmin: true});
        return this.usersRepository.save(updatedUser);
    }

    findOneByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({email});
    }
}

import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../../users/entities/user.entity';

@Entity()
export class EditorRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, {cascade: true})
    @JoinColumn()
    user: User;
}

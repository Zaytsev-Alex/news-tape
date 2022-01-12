import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {getHashedPassword} from '../../helpers/passwordHelper';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    isAdmin: boolean;

    @BeforeInsert()
    hashPassword() {
        this.password = getHashedPassword(this.password);
    }
}

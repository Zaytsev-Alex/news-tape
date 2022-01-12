import {IUserView} from '../../users/interfaces/IUserView';

export interface IAuthResponse extends IUserView {
    token: string;
}

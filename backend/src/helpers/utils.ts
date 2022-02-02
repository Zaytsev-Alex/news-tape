import {User} from '../users/entities/user.entity';
import {IUserView} from '../users/interfaces/IUserView';
import {EditorRequest} from '../editor-requests/entities/editor-request.entity';
import IEditorRequestView from '../editor-requests/interfaces/IEditorRequestView';

export function extractEditorRequestView(editorRequest: EditorRequest): IEditorRequestView {
    return {
        id:   editorRequest.id,
        user: extractUserView(editorRequest.user)
    }
}

export function extractUserView(user: User): IUserView {
    return {
        id:        user.id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        isAdmin:   user.isAdmin,
    };
}

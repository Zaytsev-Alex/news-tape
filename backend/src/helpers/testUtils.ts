import {Repository} from 'typeorm';
import {UsersService} from '../users/users.service';
import {EditorRequestsService} from '../editor-requests/editor-requests.service';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne:      jest.fn(entity => entity),
    create:       jest.fn(entity => entity),
    save:         jest.fn(entity => entity),
    findAndCount: jest.fn(entity => ([entity, 1])),
    remove:       jest.fn(entity => entity),
    update:       jest.fn(entity => entity),
}));

export const editorRequestsServiceMockFactory: () => MockType<EditorRequestsService> = () => ({
    create:        jest.fn((entity) => entity),
    findOneById:   jest.fn((entity) => ({user: entity})),
    remove:        jest.fn((entity) => entity),
    createAndSave: jest.fn((entity) => entity),
    findAll:       jest.fn((entity) => entity)
});

export const userServiceMockFactory: () => MockType<UsersService> = () => ({
    create:                  jest.fn((entity) => entity),
    login:                   jest.fn((entity) => ({user: entity})),
    updateEditorPermissions: jest.fn((entity) => entity),
    giveEditorsPermissions:  jest.fn((entity) => entity),
    findOneByEmail:          jest.fn((entity) => entity),
});

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};

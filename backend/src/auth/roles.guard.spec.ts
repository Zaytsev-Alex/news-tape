import {RolesGuard} from './roles.guard';
import {ExecutionContext, ForbiddenException, UnauthorizedException} from '@nestjs/common';

describe('RolesGuard', () => {
    let rolesGuard: RolesGuard;

    const userDto = {
        id:           1,
        firstName:    'firstName',
        lastName:     'lastName',
        email:        'email@email.email',
        password:     'password',
        isAdmin:      true,
        hashPassword: () => {}
    };

    beforeEach(() => {
        rolesGuard = new RolesGuard(null);
    });

    it('should be defined', () => {
        expect(rolesGuard).toBeDefined();
    });

    describe('canActivate', () => {
        const createMockExecutionContext = (user) => ({
            switchToHttp: () => ({
                getRequest: () => ({user})
            })
        });

        it('should return true when user is an admin', () => {
            const mockContext = createMockExecutionContext(userDto);

            // @ts-ignore
            const canActivate = rolesGuard.canActivate(mockContext);

            expect(canActivate).toBe(true);
        });

        it('should return false when user is not an admin', () => {
            const mockContext = createMockExecutionContext({...userDto, isAdmin: false});

            // @ts-ignore
            const canActivate = rolesGuard.canActivate(mockContext);

            expect(canActivate).toBe(false);
        });
    });
});

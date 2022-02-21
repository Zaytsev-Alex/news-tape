import {RolesGuard} from './roles.guard';
import {User} from '../users/entities/user.entity';

describe('RolesGuard', () => {
    let rolesGuard: RolesGuard;

    const userDto = new User();

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
            const mockContext = createMockExecutionContext({...userDto, isAdmin: true});

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

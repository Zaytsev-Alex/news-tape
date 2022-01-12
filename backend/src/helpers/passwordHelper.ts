import * as bcryptjs from 'bcryptjs';

export function getHashedPassword(password) {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
}

export function comparePassword(password, hashedPassword) {
    return bcryptjs.compareSync(password, hashedPassword);
}

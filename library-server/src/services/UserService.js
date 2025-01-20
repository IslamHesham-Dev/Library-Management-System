var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import { config } from '../config';
import UserDao from '../daos/UserDao';
import { UnableToSaveUserError, InvalidUsernameOrPasswordError, UserDoesNotExistError } from '../utils/LibraryErrors';
export function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const ROUNDS = config.server.rounds;
        try {
            const hashedPassword = yield bcrypt.hash(user.password, ROUNDS);
            const saved = new UserDao(Object.assign(Object.assign({}, user), { password: hashedPassword }));
            return yield saved.save();
        }
        catch (error) {
            throw new UnableToSaveUserError(error.message);
        }
    });
}
export function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = credentials;
        try {
            const user = yield UserDao.findOne({ email });
            if (!user) {
                throw new InvalidUsernameOrPasswordError("Invalid username or password");
            }
            else {
                const validPassword = yield bcrypt.compare(password, user.password);
                if (validPassword) {
                    return user;
                }
                else {
                    throw new InvalidUsernameOrPasswordError("Invalid username or password");
                }
            }
        }
        catch (error) {
            throw error;
        }
    });
}
export function findAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield UserDao.find();
            return users;
        }
        catch (error) {
            return [];
        }
    });
}
export function findUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield UserDao.findById(userId);
            if (user)
                return user;
            throw new UserDoesNotExistError("User does not exist with this ID");
        }
        catch (error) {
            throw error;
        }
    });
}
export function modifyUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = yield UserDao.findByIdAndUpdate(user._id, user, { new: true });
            if (!id)
                throw new UserDoesNotExistError("User does not exist with this ID");
            return user;
        }
        catch (error) {
            throw error;
        }
    });
}
export function removeUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let deleted = yield UserDao.findByIdAndDelete(userId);
            if (!deleted)
                throw new UserDoesNotExistError("User does not exist with this ID");
            return "User deleted successfully";
        }
        catch (error) {
            throw error;
        }
    });
}

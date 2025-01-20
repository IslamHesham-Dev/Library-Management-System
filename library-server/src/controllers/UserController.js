var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { findAllUsers, findUserById, removeUser, modifyUser } from '../services/UserService';
import { UserDoesNotExistError } from '../utils/LibraryErrors';
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let users = yield findAllUsers();
            res.status(200).json({ message: "Users retrieved successfully", users });
        }
        catch (error) {
            res.status(500).json({ message: "Unable to retrieve users at this time", error: error.message });
        }
    });
}
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            let user = yield findUserById(userId);
            res.status(200).json({ message: "User found successfully", user });
        }
        catch (error) {
            if (error instanceof UserDoesNotExistError) {
                res.status(404).json({ message: "User requested does not exist" });
            }
            else {
                res.status(500).json({ message: "Could not find user", error: error.message });
            }
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            let updatedUser = yield modifyUser(user);
            res.status(202).json({ message: "User updated successfully", user: updatedUser });
        }
        catch (error) {
            if (error instanceof UserDoesNotExistError) {
                res.status(404).json({ message: "User requested does not exist" });
            }
            else {
                res.status(500).json({ message: "Unable to update user currently", error: error.message });
            }
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.userId;
        try {
            yield removeUser(userId);
            res.status(202).json({ message: "User deleted successfully" });
        }
        catch (error) {
            if (error instanceof UserDoesNotExistError) {
                res.status(404).json({ message: "User requested does not exist" });
            }
            else {
                res.status(500).json({ message: "Unable to delete user at this time", error: error.message });
            }
        }
    });
}
export default { getAllUsers, getUserById, updateUser, deleteUser };

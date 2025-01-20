var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import LibraryCardDao from '../daos/LibraryCardDao';
import { LibraryCardDoesNotExistError } from '../utils/LibraryErrors';
export function registerLibraryCard(card) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const savedCard = new LibraryCardDao(card);
            return yield savedCard.save();
        }
        catch (error) {
            let c = yield LibraryCardDao.findOne({ user: card.user }).populate('user');
            if (c)
                return c;
            throw error;
        }
    });
}
export function findLibraryCard(libraryCardId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let card = yield LibraryCardDao.findOne({ _id: libraryCardId }).populate('user');
            if (card)
                return card;
            throw new LibraryCardDoesNotExistError("The library card specified does not exist");
        }
        catch (error) {
            throw error;
        }
    });
}

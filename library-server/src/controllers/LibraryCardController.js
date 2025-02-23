var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { registerLibraryCard, findLibraryCard } from '../services/LibraryCardService';
import { LibraryCardDoesNotExistError } from '../utils/LibraryErrors';
function getLibraryCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cardId } = req.params;
        try {
            let libraryCard = yield findLibraryCard(cardId);
            res.status(200).json({ message: "retrieved the user's card", libraryCard });
        }
        catch (error) {
            if (error instanceof LibraryCardDoesNotExistError) {
                res.status(404).json({ message: "The specified library card does not exist" });
            }
            else {
                res.status(500).json({ message: "Unable to retrieve the library card", error });
            }
        }
    });
}
function createLibraryCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = req.body;
        try {
            let libraryCard = yield registerLibraryCard(card);
            res.status(201).json({ message: "Generated library card for user", libraryCard });
        }
        catch (error) {
            res.status(500).json({ message: "Unable to create library card at this time", error });
        }
    });
}
export default { getLibraryCard, createLibraryCard };

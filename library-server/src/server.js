var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from './config';
import { registerRoutes } from './routes';
const PORT = config.server.port;
const app = express();
app.use(express.json());
app.use(cors());
(function startUp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(config.mongo.url, { w: "majority", retryWrites: true, authMechanism: "DEFAULT" });
            console.log("Connection to MongoDB succeefully made");
            registerRoutes(app);
            app.listen(PORT, () => {
                console.log(`Server listening on port ${PORT}`);
            });
        }
        catch (error) {
            console.log("Could not make a connection to the database");
        }
    });
})();
export default app; // Export the app for testing

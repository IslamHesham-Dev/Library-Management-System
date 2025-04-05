import dotenv from 'dotenv';
dotenv.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = process.env.MONGO_URL || '';
//for local const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/librarydb`;
const PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;
const ROUNDS = process.env.SERVER_ROUNDS ? Number(process.env.SERVER_ROUNDS) : Math.floor(Math.random() * 11);
export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: PORT,
        rounds: ROUNDS
    }
};

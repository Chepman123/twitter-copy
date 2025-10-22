"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../db"));
class RegService {
    async Reg(login, password, phone) {
        const client = await db_1.default.connect();
        try {
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const sql = `INSERT INTO users(login, password, phone) VALUES ($1, $2, $3)`;
            await client.query(sql, [login, hashedPassword, phone]);
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
        finally {
            client.release();
        }
    }
}
exports.default = RegService;

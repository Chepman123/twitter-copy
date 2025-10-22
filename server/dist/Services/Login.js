"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../db"));
class LoginService {
    async Login(login, password) {
        const client = await db_1.default.connect();
        try {
            const sql = `SELECT password FROM users WHERE login = $1`;
            const res = await client.query(sql, [login]);
            if (res.rowCount === 0)
                return false;
            const hash = res.rows[0].password;
            return await bcrypt_1.default.compare(password, hash);
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
exports.default = LoginService;

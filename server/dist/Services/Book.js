"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class BookServ {
    async Book(date, hour, service, login) {
        const client = await db_1.default.connect();
        const userRes = await client.query(`SELECT id FROM users WHERE login = $1`, [login]);
        if (userRes.rowCount === 0)
            throw new Error("Користувач не знайдений");
        const userId = userRes.rows[0].id;
        await client.query(`INSERT INTO bookings(patient_id, date, time, service, notes) VALUES ($1, $2, $3, $4, '')`, [userId, date, hour, service]);
        client.release();
    }
    async GetUsers() {
        const client = await db_1.default.connect();
        const sql = `SELECT b.id,b.date,b.time,b.service, u.login, u.phone FROM bookings b
JOIN users u ON u.id=b.patient_id  `;
        const result = (await client.query(sql)).rows;
        client.release();
        return result;
    }
    async DeleteUsers(id) {
        const client = await db_1.default.connect();
        const sql = `DELETE FROM bookings WHERE id = $1`;
        client.query(sql, [id]);
        client.release();
    }
}
exports.default = BookServ;

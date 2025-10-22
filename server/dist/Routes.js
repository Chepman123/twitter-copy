"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Registration_1 = __importDefault(require("./Controllers/Registration"));
const Registration_2 = __importDefault(require("./Services/Registration"));
const Login_1 = __importDefault(require("./Controllers/Login"));
const Login_2 = __importDefault(require("./Services/Login"));
const Book_1 = __importDefault(require("./Services/Book"));
const Book_2 = __importDefault(require("./Controllers/Book"));
exports.default = () => {
    const router = (0, express_1.Router)();
    const serv = new Registration_2.default();
    const contr = new Registration_1.default(serv);
    const servLogin = new Login_2.default();
    const contrLogin = new Login_1.default(servLogin);
    const servBook = new Book_1.default();
    const contrBook = new Book_2.default(servBook);
    router.post('/registration', (req, res) => { contr.Reg(req, res); });
    router.post('/login', (req, res) => { contrLogin.Login(req, res); });
    router.post('/book', (req, res) => { contrBook.Book(req, res); });
    router.get('/book', (req, res) => { contrBook.GetBooks(res); });
    router.delete('/book', (req, res) => { contrBook.DeleteBooks(req, res); });
    return router;
};

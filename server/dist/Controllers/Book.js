"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BookController {
    constructor(serv) {
        this.serv = serv;
    }
    Book(req, res) {
        this.serv.Book(req.body.data, req.body.hour, req.body.service, req.body.login);
        res.status(200).json({ message: 'Booking created' });
    }
    async GetBooks(res) {
        const result = await this.serv.GetUsers();
        res.json(result);
    }
    DeleteBooks(req, res) {
        this.serv.DeleteUsers(req.body.id);
        res.status(200).json({ message: 'Booking deleted' });
    }
}
exports.default = BookController;

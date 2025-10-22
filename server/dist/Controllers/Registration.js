"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegController {
    constructor(serv) {
        this.serv = serv;
    }
    Reg(req, res) {
        res.json({ result: this.serv.Reg(req.body.login, req.body.password, req.body.phone) });
    }
}
exports.default = RegController;

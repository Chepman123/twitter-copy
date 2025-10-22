"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginController {
    constructor(serv) {
        this.serv = serv;
    }
    async Login(req, res) {
        const result = await this.serv.Login(req.body.login, req.body.password);
        console.log(result);
        res.json({ result: result });
    }
}
exports.default = LoginController;

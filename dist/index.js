"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentRoutes_1 = require("./routes/studentRoutes");
const courseRoutes_1 = require("./routes/courseRoutes");
const schoolRoutes_1 = require("./routes/schoolRoutes");
const port = 3000;
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/student', studentRoutes_1.router);
app.use('/api/v1/course', courseRoutes_1.router);
app.use('/api/v1/school', schoolRoutes_1.router);
app.listen(port, () => {
    console.log('Hello you');
});

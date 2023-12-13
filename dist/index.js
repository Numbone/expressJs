"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 8080;
app.use(express_1.default.json());
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
};
let db = [
    { id: 1, title: 'Course Title' },
    { id: 2, title: 'Course Title2' },
    { id: 3, title: 'Course Title3' },
    { id: 4, title: 'Course Title4' }
];
app.get('/', (req, res) => {
    res.send(JSON.stringify(db));
    res.sendStatus(HTTP_STATUSES.OK_200);
    res.json({ message: 'send message' });
    res.send();
});
app.get('/courses', (req, res) => {
    res.json(db.filter(c => { var _a; return c.title.indexOf((_a = req.query) === null || _a === void 0 ? void 0 : _a.title) > -1; }));
});
app.get('/courses/:id', (req, res) => {
    const findCourses = db.find(item => item.id === +req.params.id);
    if (!findCourses) {
        res.send(HTTP_STATUSES.NOT_FOUND);
        return;
    }
    res.json(findCourses);
});
app.post('/courses', (req, res) => {
    db.push({
        id: +(new Date()),
        title: req.body.title
    });
    res.sendStatus(HTTP_STATUSES.CREATED).json({
        id: +(new Date()),
        title: req.body.title
    });
});
app.delete('/courses/:id', (req, res) => {
    db = db.filter(item => item.id === +req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT);
});
app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST);
        return;
    }
    const findCourses = db.find(item => item.id !== +req.params.id);
    if (!findCourses) {
        res.send(HTTP_STATUSES.BAD_REQUEST);
        return;
    }
    findCourses.title = req.body.title;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT);
});
app.listen(PORT, () => {
    console.log('listening on 8080');
});

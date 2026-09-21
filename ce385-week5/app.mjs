import express from 'express';

const app = express()
app.use(express.json());

app.get("/", (req, res) => {
  res.send("สวัสดี Express!");
});

const TODOS = [
    {id: "1", title: "ทำการบ้าน", done: true, priority: "high"}, 
    {id: "2", title: "ติดตั้ง Express", done: true, priority: "high"}, 
    {id: "3", title: "ทำ Workshop", done: false, priority: "normal"}, 
    {id: "4", title: "เตรียมสอบกลางภาค", done: false, priority: "low"}
];

const PRIORITIES = ["high", "normal", "low"];
function validateTodo(req, res, next) {
    const { title, priority } = req.body ?? {};

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ error: "title ไม่ถูกต้อง"});
    }
    if (priority !== undefined && !PRIORITIES.includes(priority)) {
        return res.status(400).json({ error: "priority ไม่ถูกต้อง"});
    }
    return next();
}

const todoRouter = express.Router();
todoRouter.get("/health", (req, res) => {
    res.json({ status: "ok"})
});
todoRouter.get("/", (req, res) => {
    res.json(TODOS.map((t) => ({ ...t})));
});

todoRouter.get("/:id", (req, res) => {
    const todo = TODOS.find((t) => t.id === req.params.id);
    if (!todo) {
        return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}`});
    }
    return res.json({ ...todo});
});

todoRouter.post("/", validateTodo, (req, res) => {
    const created = {
        id: String(TODOS.length + 1),
        title: req.body.title,
        done: false,
        priority : req.body.priority ?? "normal",
    };
    TODOS.push(created);
    res.status(201).json({ ...created});
});

app.use("/api/v1/todos", todoRouter);

app.listen(3000, () => {
  console.log("เซิร์ฟเวอร์ทำงานที่ http://localhost:3000");
});

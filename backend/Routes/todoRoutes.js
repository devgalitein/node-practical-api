const express = require("express");
const router = new express.Router();
const todoController = require("../Controller/todoController");
const { checkAuthentication } = require("../Middleware/checkAuth");

router.get("/category", (req, res) => todoController.getCategoryList(req, res));
router.get("/list", checkAuthentication ,(req, res) => todoController.getTodosList(req, res));
router.post("/create", checkAuthentication, (req, res) =>
  todoController.createTodos(req, res)
);

module.exports = router;

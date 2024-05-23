const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

router.post("/create", bookController.createBook);
router.get("/all", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.put("/update/:id", bookController.updateBookById);
router.delete("/deleate/:id", bookController.deleteBookById);

module.exports = router;

const express = require("express");
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// GET all blogs
router.get("/all-blog", getAllBlogs);

//POST || create blog
router.post("/create-blog", createBlog);

//PUT || update
router.put("/update-blog/:id", updateBlog);

// single blog
router.get("/get-blog/:id", getBlog);

//Delete || delete blog
router.delete("/delete-blog/:id", deleteBlog);

module.exports = router;

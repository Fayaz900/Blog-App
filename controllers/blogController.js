const { default: mongoose } = require("mongoose");
const blogModel = require("../models/blogModel");

// get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "no blog found",
      });
    }
    return res.status(200).send({
      success: true,
      blogCount: blogs.length,
      message: "All blog list",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error on getting blog",
    });
  }
};

// create blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
      res.status(400).send({
        success: false,
        message: "Enter any values",
      });
    }
    const newBlog = await new blogModel({ title, description, image });
    await newBlog.save();
    return res.status(200).send({
      success: true,
      message: "blog created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
  }
};

//update blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(id,
      {...req.body },
      { new: true }
    );
   return res.status(200).send({
      success: true,
      message: "update done",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error updating",
      error,
    });
  }
};

//get a single blog
exports.getBlog = async(req,res) => {
  try {
    const {id} = req.params
    const single = await blogModel.findById(id)
    if(!single){
      return res.status(404).send({
        success:false,
        message:"blog not found with this id"
      })
    }
    return res.status(200).send({
      success:true,
      message:"Blog fetched",
      single
    })
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success:false,
      message:"cannot get this blog",
      error
    })
  }
};

// delete a blog
exports.deleteBlog = async(req,res) => {
  try {
    const {id} = req.params
    const deleteBlog = await blogModel.findByIdAndDelete(id)
    if(!deleteBlog){
      return res.status(404).send({
        success:false,
        message:"there is no blog with this id"
      })
    }
    return res.status(200).send({
      success:true,
      message:"blog deleted succesfully",
      deleteBlog
    })
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success:false,
      message:"cannot delete blog with this id",
      error
    })
  }
};

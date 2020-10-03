const { default: slugify } = require("slugify");
const Blog = require("../models/blog");

// get all blogs
const allBlogs = async (req, res) => {
    let response = {}
    try {
        const blogs = await Blog.find();
        response = {
            status: true,
            data: blogs,
            msg: "All blogs"
        }
    } catch(e) {
        response = {
            status: false,
            data: {},
            msg: `Following error occured: ${e.message}`
        }
    }

    res.json(response)
}

// blog detail
const blogDetail = async (req, res) => {
    let response = {}
    try {
        const blog = await Blog.findById(req.params.id);
        response = {
            status: true,
            data: blog,
            msg: "Blog detail"
        }
    } catch(e) {
        response = {
            status: false,
            data: {},
            msg: `Following error occured: ${e.message}`
        }
    }

    res.json(response)
}

// insert blog
const insertBlog = async (req, res) => {
    let response = {}
    try {
        const blog = new Blog({
            title: req.body.title,
            body: req.body.body
        });
        const newBlog = await blog.save();

        response = {
            status: true,
            data: newBlog,
            msg: "Blog inserted successfully."
        }
    } catch(e) {
        response = {
            status: false,
            data: {},
            msg: `Following error occured: ${e.message}`
        }
    }

    res.json(response)
}

// update blog
const updateBlog = async (req, res) => {
    let response = {}
    try {
        const blog = {
            title: req.body.title,
            body: req.body.body,
            userId: 12,
            slug: slugify(req.body.title, {
                strict: true,
                lower: true
            })
        }
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog);

        response = {
            status: true,
            data: updatedBlog,
            msg: "Blog updated successfully."
        }
    } catch(e) {
        response = {
            status: false,
            data: {},
            msg: `Following error occured: ${e.message}`
        }
    }

    res.json(response)
}

// delet blog
const deleteBlog = async (req, res) => {
    let response = {}
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        response = {
            status: true,
            data: deletedBlog,
            msg: "Blog deleted successfully."
        }
    } catch(e) {
        response = {
            status: false,
            data: {},
            msg: `Following error occured: ${e.message}`
        }
    }

    res.json(response)
}

module.exports = {
    allBlogs,
    blogDetail,
    insertBlog,
    updateBlog,
    deleteBlog
}
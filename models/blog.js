const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const blogSchema = new mongoose.Schema({
    title: {
        desc: "Title of a blog.",
        trim: true,
        type: String,
        required: true
    },
    body: {
        desc: "Description of a blog.",
        trim: true,
        type: String,
        required: true
    },
    userId: {
        desc: "Id of a user who create a blog.",
        type: Number,
        default: 43,
        required: true
    },
    slug: {
        desc: "Preety URL for SEO purpose.",
        type: String,
        unique: true,
        required: true
    }
});

blogSchema.pre("validate", function (next) {
    if(this.title) {
        this.slug = slugify(this.title, {
            strict: true,
            lower: true
        })
    }
    next();
})

module.exports = mongoose.model("Blog", blogSchema);

const Post = require('../models/Post');

const createPost = async (post) => {
  try {
    const newPost = await Post.create(post);

    return newPost;
  } catch (error) {
    throw error;
  }
}

const getPosts = async () => {
  try {
    const posts = await Post.find();

    return posts;
  } catch (error) {
    throw error;
  }
}

const getPost = async (id) => {
  try {
    const post = await Post.findById(id);

    return post;
  } catch (error) {
    throw error;
  }
}

const updatePost = async (id, post) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    return updatedPost;
  } catch (error) {
    throw error;
  }
}

const deletePost = async (id) => {
  try {
    await Post.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
}
const express = require('express');
const PostService = require('../services/post');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await PostService.getPosts();

    res.json(posts);
  } catch (err) {
    next(err);  // Pasa el error al siguiente middleware (manejador de errores)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const newPost = await PostService.createPost({ title, body });

    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await PostService.deletePost(id);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await PostService.getPost(id);

    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const updatedPost = await PostService.updatePost(id, { title, body }, { new: true });

    if (!updatedPost) {
      return res.status(404).send('Post not found');
    }

    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

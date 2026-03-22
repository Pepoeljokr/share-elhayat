const express = require('express');
const router = express.Router();

// Mock data: in-memory storage for posts
let posts = [];

// CREATE a new post
router.post('/', (req, res) => {
    const newPost = { id: posts.length + 1, ...req.body };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// READ all posts
router.get('/', (req, res) => {
    res.status(200).json(posts);
});

// READ a single post by ID
router.get('/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    res.status(200).json(post);
});

// UPDATE a post by ID
router.put('/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    Object.assign(post, req.body);
    res.status(200).json(post);
});

// DELETE a post by ID
router.delete('/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).send('Post not found');
    posts.splice(postIndex, 1);
    res.status(204).send();
});

module.exports = router;
const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());
app.use(express.static(__dirname)); 


let blogs = [
    {
        id: "1",
        title: "Welcome to CodeAlpha Blog",
        content: "This is your very first sample blog post. You can create, read, and delete posts here!"
    }
];


app.get('/api/blogs', (req, res) => {
    res.json(blogs);
});


app.post('/api/blogs', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and Content are required' });
    }
    
    const newBlog = {
        id: Date.now().toString(), 
        title,
        content
    };
    
    blogs.push(newBlog);
    res.status(201).json(newBlog);
});


app.delete('/api/blogs/:id', (req, res) => {
    const { id } = req.params;
    blogs = blogs.filter(blog => blog.id !== id);
    res.json({ message: 'Blog deleted successfully' });
});


const PORT = 4000; 
app.listen(PORT, () => {
    console.log(`Blog CMS Server running on port ${PORT}`);
    
    
    exec(`start http://localhost:${PORT}/index.html`);
});
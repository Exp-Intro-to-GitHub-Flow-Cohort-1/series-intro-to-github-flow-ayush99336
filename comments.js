// Create A web server with the following end points:
// - GET /comments - returns a list of comments in the database
// - POST /comments - creates a new comment in the database
// - DELETE /comments/:id - deletes a comment from the database
// - PUT /comments/:id - updates a comment in the database
// Each comment has the following fields:
// - id (a unique number)
// - username (a string)
// - comment (a string)
// - created_at (a date)
// - updated_at (a date)
// The database is a simple array of objects. When the server starts, the database is empty. The server does not need to persist data between restarts.

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let comments = [];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    username: req.body.username,
    comment: req.body.comment,
    created_at: new Date(),
    updated_at: new Date(),
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.delete('/comments/:id', (req, res) => {
  const commentId = parseInt(req.params.id);
  comments = comments.filter((comment) => comment.id !== commentId);
  res.status(204).end();
});

app.put('/comments/:id', (req, res) => {
  const commentId = parseInt(req.params.id);
  const comment = comments.find((comment) => comment.id === commentId);
  if (comment) {
    comment.username = req.body.username;
    comment.comment = req.body.comment;
    comment.updated_at = new Date();
    res.status(200).json(comment);
  } else {
    res.status(404).end();
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


import express from 'express';
import { database, databaseUpdate, databaseDelete } from './database.js';
import cors from "cors";

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/bog/users', (req, res) => {
  res.json(database).status(200);
});


app.get('/api/bog/users/:id', (req, res) => {
  const user = database.filter((user) => user.id === req.params.id)[0]
  res.json(user).status(200)
});

app.put('/api/bog/users/:id', (req, res) => {
  const updatedUser = req.body
  if (databaseUpdate(updatedUser) == -1) {
    res.json({error: 'Volunteer not found'}).status(400)
    return;
  }
  res.json(updatedUser).status(200)
});

app.post('/api/bog/users', (req, res) => {
  database = database.push(req.body)
  res.json(req.params).status(201)
});

app.delete('/api/bog/users/:id', (req, res) => {
  const id = req.params.id
  if (databaseDelete(id) == -1) {
    res.json({error: 'Volunteer not found'}).status(400)
    return;
  }
  res.json('Volunteer successfully deleted').status(200)
});
// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

import express from 'express';
import { database, databaseUpdate, databaseDelete, databaseCreate } from './database.js';
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
  try {
    databaseUpdate(updatedUser)
  }
  catch(error) {
    res.json("Update failure").status(400)
    return;
  }
  res.json(updatedUser).status(200)
});

app.post('/api/bog/users', (req, res) => {
  const newUser = req.body
  try {
    databaseCreate(newUser)
  }
  catch(error) {
    res.json("Create failure").status(400)
    return;
  }
  res.json(req.params).status(201)
});

app.delete('/api/bog/users/:id', (req, res) => {
  const id = req.params.id
  try {
    databaseDelete(id)
  }
  catch(error) {
    res.json("Delete failure").status(400)
    console.log(error)
    return;
  }
  res.json('Volunteer successfully deleted').status(200)
});
// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection was established successfully");
})

const todoRouter = require('./routes/todo');
const userRouter = require('./routes/user');

app.use('/todo', todoRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});

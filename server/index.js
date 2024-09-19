const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mainRouter = require('./routes/index.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const corsOptions = {
    origin:process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(mainRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

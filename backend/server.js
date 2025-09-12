const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('./middleware/cors');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors);
app.use(bodyParser.json());

app.use('/api/items', taskRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'TODO API Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running');
})
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/task', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    db.raw('SELECT 1').then(() => {
        console.log('Database connection successful');
    }).catch(error => {
        console.error('Database connection error:', error);
        throw error;
    });
})

module.exports = app;
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB, sequelize } from './config/db';
import userRoutes from './routes/userRoutes';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API is running...')
})

sequelize.sync({ alter: true }).then(() => {
    console.log('PostgreSQL Connected, all models were synchronized successfully.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})

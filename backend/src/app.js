import express from 'express'
import movieRoutes from './Routes/MovieRoutes';

const app = express();
app.use(express.json());
app.use(movieRoutes);

export default app;
import express from 'express';
import { userRouter } from './routes/route.js';

const app = express();

app.use(express.json());

app.use('/nba', userRouter);

app.listen(4000, () => {
  console.log('🚀 Server ready at: http://localhost:4000');
});

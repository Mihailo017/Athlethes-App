import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import playerRouter from './routes/player.router';
import placeRouter from './routes/place.route';
import timeslotRouter from './routes/timeslot.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/diplomski');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongo ok')
});

const router = express.Router();
router.use('/users', userRouter);
router.use('/player', playerRouter);
router.use('/place', placeRouter);
router.use('/timeslot', timeslotRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
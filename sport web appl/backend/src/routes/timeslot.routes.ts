import express from 'express';
import { TimeslotController } from '../controllers/timeslot.controller';

const timeslotRouter = express.Router();

timeslotRouter.route('/checkAvailability').post(
    (req, res) => new TimeslotController().checkAvailability(req, res)
)

timeslotRouter.route('/reserve').post(
    (req, res) => new TimeslotController().reserveTimeslot(req, res)
)

timeslotRouter.route('/update').post(
    (req, res) => new TimeslotController().updateTimeslot(req, res)
)

timeslotRouter.route('/getTimeslotsForSportAndPlace').post(
    (req, res) => new TimeslotController().getTimeslotsForSportAndPlace(req, res)
)

export default timeslotRouter;
import express from 'express';
import { PlaceController } from '../controllers/place.controller';

const placeRouter = express.Router();

placeRouter.route('/register').post(
    (req, res) => new PlaceController().register(req, res)
)

placeRouter.route('/getPlacesForSport').post(
    (req, res) => new PlaceController().getPlacesForSport(req, res)
)

placeRouter.route('/getAllSports').get(
    (req, res) => new PlaceController().getAllSports(req, res)
)

placeRouter.route('/getPlacesForCity').post(
    (req, res) => new PlaceController().getPlacesForCity(req, res)
)

placeRouter.route('/login').post(
    (req, res) => new PlaceController().login(req, res)
)

placeRouter.route('/getSport').post(
    (req, res) => new PlaceController().getSport(req, res)
)

placeRouter.route('/makeTournament').post(
    (req, res) => new PlaceController().makeTournament(req, res)
)

placeRouter.route('/getOpenTournaments').post(
    (req, res) => new PlaceController().getOpenTournaments(req, res)
)

placeRouter.route('/updateSports').post(
    (req, res) => new PlaceController().updateSports(req, res)
)

export default placeRouter;
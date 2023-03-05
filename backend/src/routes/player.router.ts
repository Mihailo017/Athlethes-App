import express from 'express';
import { PlayerController } from '../controllers/player.controller';

const playerRouter = express.Router();

playerRouter.route('/register').post(
    (req, res) => new PlayerController().register(req, res)
)

playerRouter.route('/login').post(
    (req, res) => new PlayerController().login(req, res)
)

playerRouter.route('/getPlayerForName').post(
    (req, res) => new PlayerController().getPlayerForName(req, res)
)

playerRouter.route('/getPlayer').post(
    (req, res) => new PlayerController().getPlayer(req, res)
)

playerRouter.route('/sendReq').post(
    (req, res) => new PlayerController().sendFriendRequest(req, res)
)

playerRouter.route('/getPendingRequests').post(
    (req, res) => new PlayerController().getPendingRequests(req, res)
)

playerRouter.route('/acceptRequest').post(
    (req, res) => new PlayerController().acceptRequest(req, res)
)

playerRouter.route('/getAllFriendReqSent').post(
    (req, res) => new PlayerController().getAllFriendReqSent(req, res)
)

playerRouter.route('/getAllFriendReqReceived').post(
    (req, res) => new PlayerController().getAllFriendReqReceived(req, res)
)

playerRouter.route('/checkFriendship').post(
    (req, res) => new PlayerController().checkFriendship(req, res)
)

playerRouter.route('/sendInvite').post(
    (req, res) => new PlayerController().sendInvite(req, res)
)

playerRouter.route('/updatePlayerFavs').post(
    (req, res) => new PlayerController().updatePlayerFavs(req, res)
)

export default playerRouter;
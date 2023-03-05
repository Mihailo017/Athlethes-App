import express from 'express';
import Invite from '../models/invite';
import Friends from '../models/friends';
import Player from '../models/player'

export class PlayerController {
    register = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let playerCity = req.body.playerCity;
        let playerAddress = req.body.playerAddress;
        let favSports = [];
        let favPlaces = [];
        let favTimeslots = [];

        Player.collection.insertOne(
            {
                'username': username, 'email': email, 'password': password, 'firstName': firstName, 'lastName': lastName, 'playerCity': playerCity, 'playerAddress': playerAddress,
                'favSports': favSports, 'favPlaces': favPlaces, 'favTimeslots': favTimeslots
            },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    login = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let password = req.body.password;

        Player.findOne({ 'email': email, 'password': password },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    getPlayerForName = (req: express.Request, res: express.Response) => {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;

        Player.find({ 'firstName': firstName, 'lastName': lastName },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    getPlayer = (req: express.Request, res: express.Response) => {
        let email = req.body.email;

        Player.findOne({ 'email': email },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    sendFriendRequest = (req: express.Request, res: express.Response) => {
        let reqSender = req.body.reqSender;
        let reqReceiver = req.body.reqReceiver;
        let status = "req";

        Friends.collection.insertOne({ 'reqSender': reqSender, 'reqReceiver': reqReceiver, 'status': status },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    getPendingRequests = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let status = 'req';
        Friends.find({ 'reqReceiver': email, 'status': status },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    acceptRequest = (req: express.Request, res: express.Response) => {
        let reqSender = req.body.reqSender;
        let reqReceiver = req.body.reqReceiver;
        let status = 'friends';
        Friends.collection.updateOne({ 'reqSender': reqSender, 'reqReceiver': reqReceiver }, { $set: { 'status': status } },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    getAllFriendReqSent = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let status = 'friends';
        Friends.find({ 'reqSender': email, 'status': status },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    getAllFriendReqReceived = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let status = 'friends';
        Friends.find({ 'reqReceiver': email, 'status': status },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    checkFriendship = (req: express.Request, res: express.Response) => {
        let reqSender = req.body.reqSender;
        let reqReceiver = req.body.reqReceiver;
        let status = 'friends';
        Friends.find({ 'reqSender': reqSender, 'reqReceiver': reqReceiver, 'status': status },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    sendInvite = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let place = req.body.place;
        let date = req.body.date;
        let time = req.body.time;
        let invSender = req.body.invSender;
        let invReceiver = req.body.invReceiver;

        const invite = new Invite({ 'sport': sport, 'place': place, 'date': date, 'time': time, 'invSender': invSender, 'invReceiver': invReceiver });
        invite.save(
            (err, user) => {
                if (err) console.log(err);
            })
    }

    updatePlayerFavs = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let favSports = req.body.favSports;
        let favPlaces = req.body.favPlaces;
        let favTimeslots = req.body.favTimeslots;

        Player.collection.updateOne({ 'email': email }, { $set: { 'favSports': favSports, 'favPlaces': favPlaces, 'favTimeslots': favTimeslots } },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

}
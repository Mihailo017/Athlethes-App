import express from 'express';
import Sport from '../models/sport';
import Place from '../models/place'
import Tournament from '../models/tournament';

export class PlaceController {
    register = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let password = req.body.password;
        let placeName = req.body.placeName;
        let placeCity = req.body.placeCity;
        let placeAddress = req.body.placeAddress;
        let placeSports = req.body.placeSports;

        const place = new Place({ 'email': email, 'password': password, 'placeName': placeName, 'placeCity': placeCity, 'placeAddress': placeAddress, 'placeSports': placeSports });

        //Place.collection.insertOne({'email':email, 'password':password, 'placeName':placeName, 'placeCity':placeCity, 'placeAddress':placeAddress, 'placeSport':placeSport},
        place.save(
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })

        for (let i = 0; i < placeSports.length; i++) {
            Place.collection.updateOne({ 'email': email }, { $push: { 'placeSports': placeSports[i] } })
        }
    }

    getPlacesForSport = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        Place.find({ 'placeSport': sport },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    getAllSports = (req: express.Request, res: express.Response) => {
        Sport.find({},
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    getPlacesForCity = (req: express.Request, res: express.Response) => {
        let placeCity = req.body.placeCity;
        Place.find({ 'placeCity': placeCity },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    login = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let password = req.body.password;
        Place.findOne({ 'email': email, 'password': password },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    getSport = (req: express.Request, res: express.Response) => {
        let sportName = req.body.sportName;
        Sport.findOne({ 'sportName': sportName },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    makeTournament = (req: express.Request, res: express.Response) => {
        let placeName = req.body.placeName;
        let sportName = req.body.sportName;
        let date = req.body.date;

        const tournament = new Tournament({ 'placeName': placeName, 'sportName': sportName, 'date': date, 'status': 'prijava' });

        tournament.save(
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    getOpenTournaments = (req: express.Request, res: express.Response) => {

        let status = "prijava";
        Tournament.find({ 'status': status }, (err, user) => {
            if (err) console.log(err);
            else res.json(user);
        })
    }

    updateSports = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let placeSports = req.body.placeSports;

        Place.collection.updateOne({ 'email': email }, { $set: { 'placeSports': [] } });

        for (let i = 0; i < placeSports.length; i++) {
            Place.collection.updateOne({ 'email': email }, { $push: { 'placeSports': placeSports[i] } }, (err, user) => {
                if (err) console.log(err);
                //else res.json("");
            })
        }

    }
}
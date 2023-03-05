import express from 'express';
import Timeslot from '../models/timeslot'

export class TimeslotController {
    checkAvailability = (req: express.Request, res: express.Response) => {
        let place = req.body.place;
        let date = req.body.date;
        let time = req.body.time;
        let sport = req.body.sport;

        Timeslot.findOne({ 'place': place, 'date': date, 'time': time, 'sport': sport },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }

    reserveTimeslot = (req: express.Request, res: express.Response) => {
        let place = req.body.place;
        let date = req.body.date;
        let time = req.body.time;
        let sport = req.body.sport;
        let ground = req.body.ground;
        let t1 = req.body.t1;
        let t2 = req.body.t2;

        const timeslot = new Timeslot({ 'place': place, 'date': date, 'time': time, 'sport': sport, 'ground': ground, 't1': t1, 't2': t2 });

        timeslot.save((err) => {
            if (err) console.log(err);
        })
    }

    updateTimeslot = (req: express.Request, res: express.Response) => {
        let place = req.body.place;
        let date = req.body.date;
        let time = req.body.time;
        let sport = req.body.sport;
        let ground = req.body.ground;
        let t1 = req.body.t1;
        let t2 = req.body.t2;

        Timeslot.collection.updateOne({ 'place': place, 'date': date, 'time': time, 'sport': sport, 'ground': ground }, { $set: { 't1': t1, 't2': t2 } }, (err, a) => {
            if (err)
                console.log(err);
        })

        // for (let i=0; i < t1.length; i++) {
        //     Timeslot.collection.updateOne({'place':place, 'date':date, 'time':time, 'sport':sport, 'ground':ground}, {$push: {'t1': t1[i]}})
        //     Timeslot.collection.updateOne({'place':place, 'date':date, 'time':time, 'sport':sport, 'ground':ground}, {$push: {'t2': t2[i]}})
        // }

    }

    getTimeslotsForSportAndPlace = (req: express.Request, res: express.Response) => {
        let place = req.body.place;
        let sport = req.body.sport;

        Timeslot.find({ 'place': place, 'sport': sport }, (err, a) => {
            if (err)
                console.log(err);
            else
                res.json(a)
        })

    }
}
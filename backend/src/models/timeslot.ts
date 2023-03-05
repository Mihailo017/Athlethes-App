import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Timeslot = new Schema(
    {
        place: {
            type: String
        },
        date: {
            type: String
        },
        time: {
            type: String
        },
        sport: {
            type: String
        },
        ground: {
            type: Number
        },
        t1: {
            type: Array
        },
        t2: {
            type: Array
        }
    }
);

export default mongoose.model('Timeslot', Timeslot, 'timeslot');
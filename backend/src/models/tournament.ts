import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Tournament = new Schema(
    {
        placeName: {
            type: String
        },
        sportName: {
            type: String
        },
        date: {
            type: String
        },
        status: {
            type: String
        },
        t1: {
            type: Array
        },
        t2: {
            type: Array
        }
    }
);

export default mongoose.model('Tournament', Tournament, 'tournaments');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sport = new Schema(
    {
        sportName: {
            type: String
        },
        numPlayers: {
            type: String
        },
        positions: {
            type: Array
        }
    }
);

export default mongoose.model('Sport', Sport, 'sports');
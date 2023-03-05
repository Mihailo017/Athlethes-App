import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Player = new Schema(
    {
        username: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        favSports: {
            type: Array
        },
        favPlaces: {
            type: Array
        },
        favTimeslots: {
            type: Array
        }
    }
);

export default mongoose.model('Player', Player, 'player');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Place = new Schema(
    {
        email: {
            type: String
        },
        password: {
            type: String
        },
        placeName: {
            type: String
        },
        placeCity: {
            type: String
        },
        placeSports: {
            type: Array 
        }
    }
);

export default mongoose.model('Place', Place, 'place');
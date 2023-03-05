import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Invite = new Schema(
    {
        sport: {
            type: String
        },
        place: {
            type: String
        },
        date: {
            type: String
        },
        time: {
            type: String
        },
        invSender: {
            type: String
        },
        invReceiver: {
            type: String
        }
    }
);

export default mongoose.model('Invite', Invite, 'invites');
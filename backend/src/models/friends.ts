import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Friends = new Schema(
    {
        reqSender: {
            type: String
        },
        reqReceiver: {
            type: String
        },
        status: {
            type: String
        }
    }
);

export default mongoose.model('Friends', Friends, 'friends');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    title:              {type: String},
    bodyMessage:        {type: String},
    dateMessage:        {type: Date, default: Date.now},
    sender:             {type: Schema.Types.ObjectId, ref: 'users'},
    receiver:           {type: Schema.Types.ObjectId, ref: 'users'}
})

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const offerSchema = new Schema({
    author:             {type: Schema.Types.ObjectId, ref: 'users'},
    authorUsername:     {type: String},
    authorMail:         {type: String},
    title:              {type: String},
    description:        {type: String},
    date:               {type: Date  },
    duration:           {type: Number, min: 1},
    category:           {type: String, list: ['House', 'Technology', 'Music', 'Repair', 'Languages', 'Cooking']},
    status:             {type: String, enum: ['Open', 'Pending', 'Approved']},
    userRequest:        {type: String},
    image:              {type: String}
})

const Offer = mongoose.model('offers', offerSchema);

module.exports = Offer;

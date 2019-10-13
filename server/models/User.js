const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:           {type: String, unique: true},
    email:              {type: String, unique: true},
    password:           {type: String},
    firstname:          {type: String},
    lastname:           {type: String},
    birth:              {type: Date},
    bio:                {type: String},
    registrationDate:   {type: Date, default: Date.now},
    ratings:            [{type: Schema.Types.ObjectId, ref: 'reviews'}],
    timeWallet:         {type: Number, default: 2},
    profileImage:       {type: String},

});


const User = mongoose.model('users', userSchema);


module.exports = User;
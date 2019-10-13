const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
        rating:            {type: Number},
        opinion:           {type: String},
        date:              {type: Date  },
        picture:           {type: String},
        reviewer:          {type: Schema.Types.ObjectId, ref: 'users'},
        userReviewed:      {type: Schema.Types.ObjectId, ref: 'users'},
})

const Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;
const mongoose = require('mongoose');

const productSchema =   new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Please enter product description"]
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    max: [99999999, "Price cannot exceed 8 digits"]
  },
  rating: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"]
  },
  Stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    max: [9999, "Stock cannot exceed 4 digits"],
    default: 1
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);

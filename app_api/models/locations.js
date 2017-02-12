var mongoose = require('mongoose');

// using mongodb subdocuments
// subdocuments schemas needs to be before the documents schemas
var reviewSchema = new mongoose.Schema({
  author: String,
  rating: { type: Number, required: true, min: 0, max: 5},
  reviewText: String,
  createdOn: { type: Date, "default": Date.now }
});

var openingTimeSchema = new mongoose.Schema({
  days: { type: String, required: true },
  opening: String,
  closing: String,
  closed: { type: Boolean, required: true }
});

var locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  rating: { type: Number, "default": 0, min: 0, max: 5 },
  facilities: [String],
  coords: { type: [Number], index: '2dsphere', required: true }, // It allows MongoDB to calculate geometries based on a spherical object.

  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema]
});

// To meet the GeoJSON specification, a coordinate pair must be entered into the array in the correct order: longitude then latitude.

// building the model from the schema
mongoose.model('Location', locationSchema);

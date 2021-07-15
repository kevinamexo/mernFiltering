const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getallBootcamps = asyncHandler(async (req, res, next) => {
  // req.query is in similar for to the mongo query syntax, this some in handy

  let query;

  const reqQuery = { ...req.query };
  console.log(reqQuery);

  const removeFields = ["sort"];

  removeFields.forEach((val) => delete reqQuery[val]); /// delete all removeFields values in the reqQuery (from the req.params)

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // console.log(JSON.parse(queryStr));
  query = Bootcamp.find(JSON.parse(queryStr));

  ///ADDING SORT
  //MONGO SORTS IN FORM :  .sort('-price rating)
  if (req.query.sort) {
    const sortByArr = req.query.sort.split(","); // because it is int form sort:'-price,rating' in the req.query object)
    const sortByStr = sortByArr.join(" "); //BECAUSE MONGO NEEDS A SPACE BETWEEN THE SORT PARAMETERS
    console.log(sortByStr);
    query = query.sort(sortByStr);
  } else {
    //else just filter by descending order of price
    query = query.sort("-price");
  }

  const bootcamps = await query;
  res.status(200).json({
    success: true,
    data: bootcamps,
  });

  ///Filtering
});
exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});
exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.id} was not found`, 404)
    );
  }

  await Bootcamp.remove();

  res.status(201).json({
    success: true,
    data: {},
  });
});
exports.updateBootcampById = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.id} was not found`, 404)
    );
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

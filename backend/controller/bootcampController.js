import asyncHandler from "../middleware/AsyncHandler.js"
import Bootcamp from "../models/Bootcamp.js"
import ErrorResponse from "../utils/ErrorResponse.js"

//@route    GET /api/v1/bootcamps
//@desc     Fetch all bootcamps
//@access   Public
const getAllBotocamps = asyncHandler(async (req, res, next) => {
    const bootcampPerPage = Number(req.query.perPage) || 8
    const currentPage = Number(req.query.page) || 1

    let query
    const reqQuery = { ...req.query }
    const removeFields = ['sort', 'page', 'perPage', 'keyword']

    removeFields.forEach(params => delete reqQuery[params])

    let queryString = JSON.stringify(reqQuery)

    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

    query = JSON.parse(queryString)

    if (req.query.keyword) {
        query.name = { $regex: req.query.keyword, $options: 'i' }
    }

    const count = await Bootcamp.countDocuments(query)

    const bootcamps = await Bootcamp.find(query)
        .sort(req.query.sort || { price: 'asc' })
        .limit(bootcampPerPage)
        .skip(bootcampPerPage * (currentPage - 1))

    res.status(200).json({
        success: true,
        count,
        page: currentPage,
        pages: Math.ceil(count / bootcampPerPage),
        data: bootcamps
    })
})

//@route    POST /api/v1/bootcamps
//@desc     Create new Bootcamp
//@access   Private
const createBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.create(req.body)

    res.status(200).json({
        success: true,
        data: bootcamp
    })
})

//@route    PUT /api/v1/bootcamps
//@desc     Update a Bootcamp
//@access   Private
const updateBootcamp = asyncHandler(async (req, res, next) => {

    let bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp with id ${req.params.id} was not found`, 404))
        // throw new ErrorResponse(`Bootcamp with id ${req.params.id} was not found`, 404)
    }

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(201).json({
        success: true,
        data: bootcamp
    })
})

//@route    DELETE /api/v1/bootcamps/:id
//@desc     Delete a Bootcamp
//@access   Private
const deleteBootcamp = asyncHandler(async (req, res, next) => {

    let bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp with id ${req.params.id} was not found`, 404))
    }
    await bootcamp.remove()

    res.status(200).json({
        success: true,
        data: {}
    })
})

export { getAllBotocamps, createBootcamp, updateBootcamp, deleteBootcamp }
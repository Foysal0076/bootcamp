import asyncHandler from "../middleware/AsyncHandler.js"
import Bootcamp from "../models/Bootcamp.js"
import ErrorResponse from "../utils/ErrorResponse.js"

//@route    GET /api/v1/bootcamps
//@desc     Fetch all bootcamps
//@access   Public
const getAllBotocamps = asyncHandler(async (req, res, next) => {
    const bootcampPerPage = Number(req.query.perpage) || 2
    const currentPage = Number(req.query.page) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}

    const count = await Bootcamp.countDocuments({ ...keyword })

    const bootcamps = await Bootcamp.find({ ...keyword })
        .sort({ createdAt: -1 })
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
const courseModel = require("../models/courseModel");

const mongoose = require("mongoose");

const createCourse = (req, res) => {
    //b1: thu thập dữ liệu
    let bodyRequest = req.body;
    //console.log(bodyRequest);

    //b2: validate
    if (!bodyRequest.courseCode) {
        res.status(400).json({
            status: "Error 400: Bad Request",
            message: "courseCode is required"
        })
    };
    if (!bodyRequest.courseName) {
        res.json(400).json({
            status: "Error 400: Bad Request",
            message: "courseName is required"
        })
    };
    if (!(Number.isInteger(bodyRequest.price) && bodyRequest.price > 0)) {
        res.json(400).json({
            status: "Error 400: Bad Request",
            message: "price is not valid"
        })
    };
    if (!(Number.isInteger(bodyRequest.discountPrice) && bodyRequest.discountPrice >= 0)) {
        res.json(400).json({
            status: "Error 400: Bad Request",
            message: "discountPrice is not valid"
        })
    };
    if (!bodyRequest.duration) {
        res.json(400).json({
            status: "Error 400: Bad Request",
            message: "duration is required"
        })
    };
    if (!bodyRequest.level) {
        res.json(400).json({
            status: "Error 400: Bad Request",
            message: "level is required"
        })
    };
    if (!bodyRequest.coverImage) {
        res.json(400).json({
            status: "Error 400: Bad Request",
            message: "coverImage is required"
        })
    };
    if (!bodyRequest.teacherName) {
        res.json(400).json({
            status: "Error 400: Bad Request",
            message: "teacherName is required"
        })
    };
    if (!bodyRequest.teacherPhoto) {
        res.json(400).json({
            status: "Error 400: Bad Request",
            message: "teacherPhoto is required"
        })
    };

    //b3: thao tác vs csdl
    //tạo object lưu body
    let newCourseObj = {
        _id: mongoose.Types.ObjectId(),
        courseCode: bodyRequest.courseCode,
        courseName: bodyRequest.courseName,
        price: bodyRequest.price,
        discountPrice: bodyRequest.discountPrice,
        duration: bodyRequest.duration,
        level: bodyRequest.level,
        coverImageName: bodyRequest.coverImageName,
        coverImage: bodyRequest.coverImage,
        teacherName: bodyRequest.teacherName,
        teacherPhotoName: bodyRequest.teacherPhotoName,
        teacherPhoto: bodyRequest.teacherPhoto,
        isPopular: bodyRequest.isPopular,
        isTrending: bodyRequest.isTrending
    }

    //truyền vào csdl
    courseModel.create(newCourseObj, (err, data) => {
        if (err) {
            res.status(500).json({
                status: "Error 500",
                message: err.message
            })
        }
        else {
            res.status(201).json({
                status: "Success 201 : Create course success",
                courses: data
            })
        }
    });
}
const getAllCourse = (req, res) => {
    //b1
    //b2
    //b3
    courseModel.find((err, data) => {
        if (err) {
            res.status(500).json({
                status: "Error 500",
                message: err.message
            })
        }
        else {
            res.status(201).json({
                status: "Success 200: Get All Course",
                courses: data
            })
        }
    })
}

const getCourseById = (req, res) => {
    let paramCourseId = req.params.courseId;
    //console.log(paramCourseId);

    courseModel.findById(paramCourseId, (err, data) => {
        if (err) {
            res.status(500).json({
                status: "Error 500",
                message: err.message
            })
        }
        else {
            res.status(201).json({
                status: "Success 200 : Find Course by courseID = " + paramCourseId,
                courses: data
            })
        }
    })
}

const updateCourseById = (req, res) => {
    //b1: thu thập dữ liệu
    let bodyRequest = req.body;
    //console.log(bodyRequest);
    let paramCourseId = req.params.courseId;
    //console.log(paramCourseId);

    //validate
    if(!mongoose.Types.ObjectId.isValid(paramCourseId)){
        res.json(400).json({
            status: "Error 400: Bad Request",
            message: "CourseId is not valid"
        })
    }

    //b3: thao tác vs csdl
    //tạo object lưu body
    let updateCourseObj = {
        courseCode: bodyRequest.courseCode,
        courseName: bodyRequest.courseName,
        price: bodyRequest.price,
        discountPrice: bodyRequest.discountPrice,
        duration: bodyRequest.duration,
        level: bodyRequest.level,
        coverImageName: bodyRequest.coverImageName,
        coverImage: bodyRequest.coverImage,
        teacherName: bodyRequest.teacherName,
        teacherPhotoName: bodyRequest.teacherPhotoName,
        teacherPhoto: bodyRequest.teacherPhoto,
        isPopular: bodyRequest.isPopular,
        isTrending: bodyRequest.isTrending
    }

    //truyền vào csdl
    courseModel.findByIdAndUpdate(paramCourseId, updateCourseObj, (err, data) => {
        if (err) {
            res.status(500).json({
                status: "Error 500",
                message: err.message
            })
        }
        else {
            res.status(201).json({
                status: "Success 200 : Update course success",
                courses: data
            })
        }
    });
}

const deleteCourseById = (req, res) => {
    let paramCourseId = req.params.courseId;
    //console.log(paramCourseId);

    courseModel.findByIdAndDelete(paramCourseId, (err, data) => {
        if (err) {
            res.status(500).json({
                status: "Error 500",
                message: err.message
            })
        }
        else {
            res.status(201).json({
                status: "Success 200 : Delete Course by courseID = " + paramCourseId,
                courses: data
            })
        }
    })
}

module.exports = {
    createCourse,
    getAllCourse,
    getCourseById,
    updateCourseById,
    deleteCourseById,
}


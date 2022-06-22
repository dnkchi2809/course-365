const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const courseModel = new Schema({
    _id : {
        type: mongoose.Types.ObjectId
    },
    courseCode : {
        type: String,
        unique : true,
        required : true
    },
    courseName : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    discountPrice : {
        type: Number,
        required : true
    },
    duration: {
        type : String,
        required : true
    },
    level : {
        type : String,
        required: true
    },
    coverImage : {
        type: imageSchema,
        required: true
    },
    teacherName:{
        type: String,
        required : true
    },
    teacherPhoto:{
        type: imageSchema,
        required : true
    },
    isPopular : {
        type : Boolean,
        default : false
    },
    isTrending : {
        type : Boolean,
        default : false
    },
    ngayTao : {
        type : Date,
        default : Date.now()
    },
    ngayCapNhat : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("course", courseModel);
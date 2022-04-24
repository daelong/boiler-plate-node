const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
    },
    email: {
        type: String,
        trim: true, //빈칸(공백) 없애는거
        unique: 1,
    },
    password: {
        type: String,
        maxLength: 5
    },
    lastname: {
        type: String,
        maxLength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: { //유효성 검사
        type: String,
    },
    tokenExp:{//토큰 유효기간
        type: Number,
    }
})

const User = mongoose.model('User', userSchema) //스키마를 모델로 감싸줌

module.exports = {User}
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10;

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
        maxLength: 10
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

//mongoose method
userSchema.pre('save', function(next){
    var user = this;
    console.log('pre')
    if(user.isModified('password')){
        //비밀번호 바꾸는경우
        //비멀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt){ //첫번째 인자는 salt round, 두번째 함수는 에러면 에러 리턴, 성공하면 salt를 리턴
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{
        //비밀번호 바꾸지 않는 경우
        next();
    }
})

const User = mongoose.model('User', userSchema) //스키마를 모델로 감싸줌

module.exports = {User}
const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const config = require('./config/key');
if(process.env.NODE_ENV === 'production'){
    require('dotenv').config({ path: './.env.product'});
}else{
    require('dotenv').config({ path: './.env.develop'});
}


console.log(process.env.MONGODB_URI)
const { User } = require('./models/User');

//bodyparser는 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해주는것
//application/x-www-form-urlencoded 파일의 데이터를 분석해서 가져오는거
app.use(bodyParser.urlencoded({extended: true}));

//application/json 파일의 데이터를 분석해서 가져오는거
app.use(bodyParser.json());

const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('mongodb connected..'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello world! 12312 sf,efselfh'))

app.post('/register', (req, res) => {
    //회원가입할때 필요한 정보들을 client에서 가져오면 데이터베이스에 넣어준다
    const user = new User(req.body)

    //이 save()는 몽고디비에서 모델에서 온거
    user.save((err, doc) => {
        if(err) return res.json({ success: false, err: err})
        return res.status(200).json({ success: true})
    })
})

app.post('/login', (req, res) => {

    //요청된 이메일을 데이터베이스에 있는지 찾는다
    User.findOne({email: req.body.email}, (err, userInfo) => { //없으면 err, 있으면 userInfo
        if(!userInfo){
            //찾은 데이터가 없음
            return res.json({//응답
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        
        //요청된 이메일의 비밀번호가 디비의 비밀번호와 맞는지 확인한다.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
            return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.'});

            //비밀번호가 맞으면 토큰을 생성한다.
            user.generateToken((err, user) => {})
        })


    } ) //mongodb method

})

app.listen(port, () => console.log(`Example app listening on port ${port}`))

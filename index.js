const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const { User } = require('./models/User');

//bodyparser는 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해주는것
//application/x-www-form-urlencoded 파일의 데이터를 분석해서 가져오는거
app.use(bodyParser.urlencoded({extended: true}));

//application/json 파일의 데이터를 분석해서 가져오는거
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://daelong:abc123!@cluster0.yeopo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('mongodb connected..'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello world! 12312'))

app.post('/register', (req, res) => {
    //회원가입할때 필요한 정보들을 client에서 가져오면 데이터베이스에 넣어준다
    console.log('register ??')
    console.log(req.body)
    const user = new User(req.body)
    console.log(user);

    //이 save()는 몽고디비에서 모델에서 온거
    user.save((err, doc) => {
        console.log(err)
        console.log(doc)
        if(err) return res.json({ success: false, err})
        return res.status(200).json({ success: true})
    })


})

app.listen(port, () => console.log(`Example app listening on port ${port}`))

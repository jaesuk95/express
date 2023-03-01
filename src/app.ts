// const express = require('express')
import * as express from "express";
import {Cat, CatType} from "./app.model";

const app: express.Express = express();
// const app: express.Application = express();  // 이렇게 해도 작
const port: number = 8000;

console.log(`server is started at port ${port}`)

// express 에서는 바디에 json 을 읽어 올 수 없어서, middleware 에서 추가하도록 한다
// json middleware
app.use(express.json());

// read 고양이 전체 조회
app.get('/cats', (req,res) => {
    try {
        const cats = Cat;
        // throw new Error('db connection error'); // 일부러 에러 터뜨리는

        res.status(200).send({
            success: true,
            data: {
                cats
            }
        });
    } catch (e) {      // <= e: any You cannot use 'e' at all until the type        "useUnknownInCatchVariables": false, 상태로 변경
        res.status(200).send({
            success: false,
            error_message: e.message,
        });
    }
})


// read 특정 데이터 조회
app.get('/cats/:id', (req, res) => {
    try {
        const id = req.params.id;
        console.log(`requested id ${id}`);
        const cats = Cat.find((cat) => {
            return cat.id === id;
        });
        res.status(200).send({
            success: true,
            data: {
                cats
            }
        });
    } catch (e) {      // <= e: any You cannot use 'e' at all until the type        "useUnknownInCatchVariables": false, 상태로 변경
        res.status(200).send({
            success: false,
            error_message: e.message,
        });
    }
});

// create 새로운 고양이 추가
app.post('/cats', (req,res) => {
    try {
        const body = req.body;
        // 주의! json middleware 추가 해야한다
        Cat.push(body); // 이렇게 하는 순간 create

        res.status(201).send({
            success: true,
            message: '등록 성공, 하지만 db 가 없으므로 실제로 등록 안됨'
        })
    } catch (e) {

    }
})

// tutorial 1
// middleware
// 주의: middleware 는 맨 앞에 있어야 한다, 끝에 있으면 안 읽음. 순서가 중요하다

// logging middleware
app.use((req,res,next)=> {
    console.log(req.rawHeaders[3])
    console.log('middleware has been processed')
    next();
})

// 추가 middleware 과정
app.get('/tutorial1/cats/som', (req,res,next)=> {
    console.log('this middleware is specifically for "som" cat');
    next();
})

app.get('/tutorial1/cats/blue', (req,res) => {
    // console.log(req.rawHeaders[3])
    console.log('/cats/blue has been called')
    res.send({blue: Cat[0]})
});

app.get('/tutorial1/cats/som', (req,res) => {
    // console.log(req.rawHeaders[3])
    console.log('tutorial1/cats/som has been called')
    res.send({som: Cat[1]})
});

// 모킹 데이터
app.get('/tutorial1/', (req: express.Request, res: express.Response) => {
    console.log(req);
    console.log(req.rawHeaders[1])
    res.send({data: Cat})
});


// 밑에 있는 것을 router 라고 부른다
// app.get('/', (req: express.Request, res: express.Response) => {
app.get('/tutorial1/hello-world', (req,res) => {
    console.log(req)
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listenting at http://localhost:${port}`)
})

// 잘못된 uri request 대체하는 방식
// 404 middleware
app.use((req,res,next)=> {
    const url = req.url;
    console.log(`request ${url} has not been found`)
    res.send({error: '404 not found error'});
})



// npm install --global nodemon
// npm install typescript --save-dev
// npm install --save-dev prettier
// npx prettier --writen
// npm install express
// npm install typescript
// npx tsc --init
// npx tsc
// npm install --save-dev @types/node <- a package that provides TypeScript definitions for Node.js.
// tsc-watch <- 파일을 계속 지켜보고 있는것이다 , 계속 compile 해준다

// npm run start:dev
// typeScript 를 노드 위에서 사용법

// dependencies 와 devDependencies 의 차이점은 데브 같은 경우는 개발할 때 올려두고, 실제 productionServer 에서는 dependencies

// 추가적으로 js 사용하는 것이 아닌 typeScript 를 사용하기 때문에 추가적으로 설치할게 있다
// npm i @types/express -D
// 데브 디펜던시에 올려둔다, package.json 에서 start : node dist/app.js 으로 시작해줄 건데 여기서는 노드로 js 를 시작한다, 컴파일된 파일 위에서 개발을 하기 때문에 데브에 붙인다
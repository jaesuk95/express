// read 고양이 전체 조회
import {Cat, CatType} from "./cats.model";
import {Router} from "express";

const router = Router();

// import * as express from "express";

router.get('/cats', (req, res) => {
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
router.get('/cats/:id', (req, res) => {
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
router.post('/cats', (req,res) => {
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






router.get('/tutorial1/cats/blue', (req,res) => {
    // console.log(req.rawHeaders[3])
    console.log('/cats/blue has been called')
    res.send({blue: Cat[0]})
});

router.get('/tutorial1/cats/som', (req,res) => {
    // console.log(req.rawHeaders[3])
    console.log('tutorial1/cats/som has been called')
    res.send({som: Cat[1]})
});

// 모킹 데이터
router.get('/tutorial1/', (req, res) => {
    console.log(req);
    console.log(req.rawHeaders[1])
    res.send({data: Cat})
});

// 추가 middleware 과정
router.get('/tutorial1/cats/som', (req,res,next)=> {
    console.log('this middleware is specifically for "som" cat');
    next();
})


export default router;


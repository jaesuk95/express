// read 고양이 전체 조회
import {Cat, CatType} from "./cats.model";
import {Router} from "express";
import {createCat, deleteCat, findCat, readAllCats, updateCat, updatePartialCat} from "./cats.service";


const router = Router();

// import * as express from "express";

// read All cats
router.get('/cats', readAllCats)

// read 특정 데이터 조회
router.get('/cats/:id', findCat);

// create 새로운 고양이 추가
router.post('/cats', createCat)

// 기존에 있는 고양이 데이터 update -> put
router.put('/cats/:id', updateCat)

// patch 부분적으로 업데이트
router.patch('/cats/:id', updatePartialCat)

// delete
router.delete('/cats/:id', deleteCat)




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


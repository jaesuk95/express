import {Request,Response} from "express";
import {Cat, CatType} from "./cats.model";

// business logics
export const readAllCats = (req: Request, res: Response) => {
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
};


// read 특정 데이터 조회
export const findCat = (req: Request, res: Response) => {
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
};

// create 새로운 고양이 추가
export const createCat = (req: Request,res: Response) => {
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
}

// 기존에 있는 고양이 데이터 update -> put
export const updateCat = (req:Request,res:Response)=> {
    try {
        const id = req.params.id;
        const body = req.body;
        let result;

        // 모킹한 데이터를 다 가져와서 일치한 아이디를 검사한다
        Cat.forEach((cat)=>{
            if (cat.id === id) {
                cat = body;
                result = cat;
            }
        })

        res.status(200).send({
            success: true,
            data: {
                message: 'successfully updated',
                cats: result
            }
        });
    } catch (e) {      // <= e: any You cannot use 'e' at all until the type        "useUnknownInCatchVariables": false, 상태로 변경
        res.status(200).send({
            success: false,
            error_message: e.message,
        });
    }
}

// patch 부분적으로 업데이트
export const updatePartialCat = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const body = req.body;
        let result;

        // 모킹한 데이터를 다 가져와서 일치한 아이디를 검사한다
        Cat.forEach((cat) => {
            if (cat.id === id) {
                cat = {...cat, ...body}     // 부분적으로 업데이트 <- 이거 좀 신기하네, 자바에서는 매우 복잡한데
                result = cat;
            }
        })

        res.status(200).send({
            success: true,
            data: {
                message: 'successfully updated',
                cats: result
            }
        });
    } catch (e) {      // <= e: any You cannot use 'e' at all until the type        "useUnknownInCatchVariables": false, 상태로 변경
        res.status(200).send({
            success: false,
            error_message: e.message,
        });
    }
};

// delete
export const deleteCat = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const body = req.body;
        let result;

        // filter 을 하여 아이디가 같지 않은 데이터만 가져온다
        const newCat = Cat.filter((cat) => cat.id !== id)

        res.status(200).send({
            success: true,
            data: {
                message: 'successfully updated',
                cats: newCat
            }
        });
    } catch (e) {      // <= e: any You cannot use 'e' at all until the type        "useUnknownInCatchVariables": false, 상태로 변경
        res.status(200).send({
            success: false,
            error_message: e.message,
        });
    }
};

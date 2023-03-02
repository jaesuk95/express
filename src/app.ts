// const express = require('express')
import * as express from "express";
import catsRouter from './cats/cats.route';

const app: express.Express = express();
// const app: express.Application = express();  // 이렇게 해도 작
const port: number = 8000;

console.log(`server is started at port ${port}`)



// 싱글톤 패턴
// 객체의 인스턴스가 오직 한개만 생성되게 패턴이다
// 예를 들어, 클래스가 하나 인스턴스로 찍어 내는
// 메모리 방지를 방지할 수 있다.
// 여기서는 app 이다
// 다른 클래스의 인스턴스들이 접근하여 사용할 수 있다.
class Server {
    public app: express.Application

    constructor() {
        const app: express.Application = express();
        this.app = app;
    }


    // 각각 라우터들을 분리할 수 있다.
    private setRoute() {
        // cats.router.ts 를 걸친다
        this.app.use(catsRouter);
    }

    private setMiddleware() {

        // logging middleware
        this.app.use((req,res,next)=> {
            console.log(`middleware has been processed by request ${req.rawHeaders[3]}`)
            next();
        })

        // express 에서는 바디에 json 을 읽어 올 수 없어서, middleware 에서 추가하도록 한다
        this.app.use(express.json());

        this.setRoute();

        // 잘못된 uri request 대체하는 방식
        // 404 middleware
        this.app.use((req,res,next)=> {
            const url = req.url;
            console.log(`request ${url} has not been found`)
            res.send({error: '404 not found error'});
        })
    }

    public listen() {
        this.setMiddleware();
        this.app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`)
        })
    }
}

// 서버가 하나의 인스턴스를 찍혀서, 싱글톤 인스턴스 하나가 서버를 실행시킨다.
function init() {
    const server = new Server();
    server.listen();
}

init();


// 밑에 있는 것을 router 라고 부른다
// app.get('/', (req: express.Request, res: express.Response) => {
app.get('/hello-world', (req,res) => {
    console.log(req)
    res.send('Hello World!')
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
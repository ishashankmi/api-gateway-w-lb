import express from 'express';
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';
const app = express();

app.use(morgan('dev'));

const data: string[] = ['sammy', 'sam', 'shashank', 'john cena', 'brock lesnar', 'goldberg', 'cooper']

app.get('/', (req, resp)=>{
    resp.json({success:'ok', user: data[Math.floor(Math.random() * 7)], server: 'servering from server 3'})
    .end();
})
.listen(3000, ()=>{console.log('Users Server is Running')})
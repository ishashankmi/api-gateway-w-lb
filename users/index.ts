import express from 'express';
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';
const app = express();

const ipWhitelist = (req: Request, res: Response, next: NextFunction) => {
    const allowedIPs: any = ['172.28.0.1'];
    
    const clientIP = 
      req.ip || 
      (req.connection as any).remoteAddress || 
      (req.socket as any).remoteAddress;

    console.log(clientIP);
  
    const forwardedIP: string | undefined = req.get('X-Forwarded-For');
  
    console.log('Incoming IP:', clientIP);
    console.log('Forwarded IP:', forwardedIP);
    const api_gateway_ip = forwardedIP?.split(' ')[1];
  
    if (allowedIPs.includes(api_gateway_ip)) {
      next();
    } else {
      res.status(403).end()
    }
  };


app.use(ipWhitelist);
app.use(morgan('dev'));

const data: string[] = ['sammy', 'sam', 'shashank', 'john cena', 'brock lesnar', 'goldberg', 'cooper']

app.get('/', (req, resp)=>{
    resp.json({success:'ok', user: data[Math.floor(Math.random() * 7)], server: 'servering from server 2'})
    .end();
})
.listen(3000, ()=>{console.log('Users Server is Running')})
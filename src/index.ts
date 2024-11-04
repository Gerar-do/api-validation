import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import  express  from 'express';
import cors from 'cors';

dotenv.config();


import { config } from "./config";
import { clientRouter } from './client/insfrastructure/routes/client-router';


function bootstrap(){
    const app = express(); 
    app.use(cors());
    
    app.use(bodyParser.json());
    app.use("/api/v1/clients", clientRouter);
   



    const {port} = config.server

    app.listen(port, () => {
        console.log(`[APP] - Server is running on port ${port}`);
    });
}

bootstrap();

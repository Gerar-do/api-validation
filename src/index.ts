import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit'; // Importa express-rate-limit

dotenv.config();

import { config } from "./config";
import { clientRouter } from './client/insfrastructure/routes/client-router';

function bootstrap() {
    const app = express(); 
    app.use(cors());
    app.use(bodyParser.json());

    // Configuración de la limitación de velocidad
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 100, // Límite de 100 solicitudes por IP por 'windowMs'
        message: 'Demasiadas solicitudes desde esta IP, intente de nuevo después de 15 minutos',
    });

    // Aplica la limitación de velocidad globalmente a todas las rutas
    app.use(limiter);

    // Ruta de la API
    app.use("/api/v1/clients", clientRouter);

    // Puerto del servidor
    const { port } = config.server;
    app.listen(port, () => {
        console.log(`[APP] - Server is running on port ${port}`);
    });
}

bootstrap();

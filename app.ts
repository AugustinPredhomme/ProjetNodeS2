import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";


import router from "./routes";
import { connectDB } from "./config/database";
import { env } from "./config/env";
import { authMiddleware } from './middlewares/authMiddleware';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import { refreshTokenMiddleware } from './middlewares/refreshTokenMiddleware';

const app = express();
const { PORT, FRONTEND_URL } = env;

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}))

//Views
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use(helmet());

//Middlewares
app.use(authMiddleware);
app.use(refreshTokenMiddleware);
app.use(errorHandler);

// Routeur par défaut
app.get("/api", (req, res) => {
    res.send("Bienvenue sur mon API RESTful!");
});

//Routes
app.use('/', router);

// Start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

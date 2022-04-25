import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import routes from "./routes";

// Middleware
const app = express();

app.use(cors());
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({limit: '10mb'}));
app.use(morgan('dev'));
app.use(cookieParser());


// Routes
app.use('/auth', routes.authRouter);
app.use('/category', routes.categoryRouter);
app.use('/post', routes.postRouter);

// Database
import './config/database'


// server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
});
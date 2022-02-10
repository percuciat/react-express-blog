import express from 'express'
import dotenv from 'dotenv'

dotenv.config();


import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import routes from "./routes";

// Middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cookieParser());


// Routes
app.use('/auth', routes.authRouter)
app.use('/', routes.postRouter)
/*app.use('/post', routes.postRouter);
app.use('/', routes.app);*/

// Database
import './config/database'


// server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
});
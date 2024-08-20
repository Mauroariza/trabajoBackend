import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes/index'
import passport from 'passport'
//import localStrategy from './libs/passport/localStrategy'

const server = express();
server.use(express.json());
server.use(morgan('dev'));

const corsOptions={
    origin:'http://localhost:3000',
    optionsSuccessStatus:200,
    credentials:true,
    methods:'GET,PUT,POST,DELETE',
    allowedHeaders:'origin, x-requested-with, content-type, accept, authorization'
}
server.use(cors(corsOptions));

//passport.use(localStrategy);
server.use(passport.initialize());

server.use(router);

export default server;
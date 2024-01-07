

//Api documentation
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";


import express from 'express';
import 'express-async-errors'
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';

//security packages
import helmet from 'helmet';
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'


import connectDB  from './config/db.js';
//Route Imports
import testRoutes from './routes/testRoute.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import jobsRoute from './routes/jobsRoute.js';

import errorMiddleware from './middlewares/errorMiddleware.js';


//config Dot ENV
dotenv.config();

//mongodb Connection
connectDB();

//swagger api config
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        url: "https://localhost:8080",
      },
    ],
  },

  apis:['./routes/*.js'],
};


const spec = swaggerJsDoc(options)



//rest Object
const app = express();

//middleware for json
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));



//routes
app.use('/api/v1/test',testRoutes);
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/job',jobsRoute);


//homeroute root
app.use('/api-doc',swaggerUi.serve, swaggerUi.setup(spec));

//validation middleware
app.use(errorMiddleware);

// port
const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
    // console.log(`Node Server is Running in ${process.env.NODE_ENV}, mode on port ${PORT}`.bgCyan.white);
})

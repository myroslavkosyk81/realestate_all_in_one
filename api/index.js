import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();
import cors from 'cors';

const allowedOrigins = ['http://localhost:5173', 'https://real-estate-front-vercel.vercel.app'];



mongoose.connect(process.env.MONGO).then(() => {
    console.log('mongoDB connected');
}).catch(() => {
    console.log(err);
})

const __dirname = path.resolve();

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));
// app.use(cors({
//     origin: (origin, callback) => {
//       if (allowedOrigins.includes(origin) || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true
//   }));
app.use((req, res, next) => {
    // console.log('Request Origin:', req.headers.origin);
    next();
  });

app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running!')
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

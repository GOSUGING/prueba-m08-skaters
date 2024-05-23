import express from 'express';
import cookieParser from 'cookie-parser';
import fileUpload from "express-fileupload";
import SkaterRouter from './routes/skater.routes.js';
import path from 'path';
import { verifyTokenJWT } from './middlewares/jwt.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = import.meta.dirname;

app.use(cookieParser());
app.use(fileUpload());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,  'public')));

app.use('/skater', SkaterRouter);

app.get('/protected', verifyTokenJWT, (req, res)=>{
    res.json({ validToken: true, email: req.email});
})

app.get('/', (req, res)=>{
    res.sendFile('index.html');
});

app.listen(PORT, ()=>{
    console.log(`Server up on http://localhost:${PORT}`);
})
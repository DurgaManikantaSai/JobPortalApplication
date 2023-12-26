import express from 'express';
import 'express-async-errors';
import userModel from './models/userModel';
const app = express();

app.get('/users',async(req,res) => {
    const users = await User.findAll();
    res.send(users);
})

app.use(async(req,res) => {
    const user = await User.findByToken(req.get('authorization'));

    if(!user) throw Error("access denied");
});

app.use((err,req,res,next) => {
    if(err.message === 'access denied'){
        res.status(403);
        res.json({error:err.message});
    }
    next(err);
})
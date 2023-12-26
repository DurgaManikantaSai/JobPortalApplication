// import e from 'express';
import userModel from '../models/userModel.js';

export const registerController = async (req, res, next) => {

    const { name, email, password } = req.body;
    // validate
    if (!name) {
        next('name is required');
    }
    if (!email) {
        next('email is required');
    }
    if (!password) {
        next('password is required and should be atleast 6 chars');
    }

    //check if Email alredy Exist

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        next('Email Already Register Pleae Login');
    }

    const user = (await userModel.create({ name, email, password }));

    const token = user.createJWT();

    // const {password:userPassword,...userWithoutPassword} = user;

    res.status(201).send({
        success: true,
        message: "User created Successfully",
        user,
        token
    })

}



//Login controller

export const loginController = async(req,res,next) => {
    const {email,password} = req.body;
    //validation
    if(!email || !password){
        next('Please Provide All Fields');
    }
    //find user by email
    const user = await userModel.findOne({email});
    if(!user){
        next('Invalid Username or password');
    }

    //compare Password
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        next('Invalid Username or password');
    }

    const token = user.createJWT();

    res.status(200).json({
        success:true,
        message:"Login Successful",
        user,
        token,
    });
};
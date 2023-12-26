import userModel from "../models/userModel.js";

export const updateUserController = async(req,res,next) => {
    const {name,email,lastName,location} = req.body;
    if(!name){
        next('Please Provide Name');
    }
    if(!email){
        next('Pleae Provide email');
    }
    if(!lastName){
        next('Please Provide lastName');
    }
    if(!location){
        next('Please Provide Password');
    }

    const user = await userModel.findOne({_id:req.user.userId});
    user.name = name
    user.lastName = lastName
    user.email = email
    user.location = location    

    await user.save();
    const token = user.createJWT()
    res.status(200).json({
        user,
        token,
    })
}
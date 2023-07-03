import userModel from "../model/userModel.js";

export const registerController = async (req,res,next) => {

        const {name,email,password} = req.body;
        //validate
        if(!name){
           next(`Name is required`)
        }
        if(!email){
            next(`Email is required`)
        }
        if(!password){
            next(`Password is required and greater than six character`)
        }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            next(`Email is already registered.Please Login`)
        }

        const user = await userModel.create({name,email,password});

        const token = user.createJWT()
        res.status(201).send({success:true,message:"User Created Successfully",user:{
            name:user.name,
            email:user.name,
            location:user.location
        },token})

     
}

export const loginController = async (req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password){
        next('Please Provide All Fields');
    }

    const user = await userModel.findOne({email}).select("+password");
    if(!user){
        next(`Invalid Credentials`);
    }
    //compare password
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        next('Invalid Credentials');
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json({
        success:true,
        message:'Login Successfully',
        user,
        token,
    })
}
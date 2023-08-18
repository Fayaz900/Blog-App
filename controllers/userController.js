const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

// create a user
exports.registerController = async (req,res) => {
    try {
        const {username,email,password} = req.body
        //validation
        if(!username || !email || !password){
            console.log("please fill all fields");
        }
        // existing user
        const exist = await userModel.findOne({email})
        if(exist){
            console.log("Already existing user");
        }
        const hash = await bcrypt.hash(password,10)
        //save new user
        const user = new userModel({username,email,password : hash})
        await user.save()
        return res.status(201).send({
            success: true,
            message:"New user created",
            user,
        })

    } catch (error) {
        console.log(error);
    }
};

// get All users
exports.getAllUsers = async (req,res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount:users.length,
            message:"all users data",
            users,
        })
    } catch (error) {
        console.log(error);
    }
};

//login
exports.loginController = async (req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
            console.log("Enter values");
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).send({
                message:"not registered",
            })
           
        }
        //password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).send({
                message : "invalid id or pass"
            })

        }
        return res.status(200).send({
            message : "log in success"
        })
    } catch (error) {
        console.log(error);
    }
};

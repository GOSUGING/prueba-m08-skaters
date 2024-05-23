import { SkaterModel } from "../models/skater.model.js";
import jwt from 'jsonwebtoken';
import path from 'path';

const __dirname = import.meta.dirname;


const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await SkaterModel.oneByMail(email);

        if(!user){
            throw {
                code: 400,
                msg: "Email no registrado!"
            };
        }

        if(password != user.password){
            throw {
                code: 401,
                msg: "Contraseña invalida!"
            };
        }

        const token = jwt.sign(
            {email: user.email},
            process.env.SECRET_JWT,
            { expiresIn: "1h"}
        );
        //res.cookie('token', token, {httpOnly: true});
        return res.cookie('token', token, {httpOnly: true}).json({token, email: user.email});

    } catch (error) {
        console.error(error);
        const { code, msg } = error;
        return res.status(code).json({ok: false, msg});
    }
}


const register = async(req, res) => {
    try {
        const { email, name, password, anos_experiencia, especialidad } = req.body;
        const foto = req.files.foto

        console.log({ email, name, password, anos_experiencia, especialidad, foto })

        const newSkater = await SkaterModel.oneByMail(email);
        if(newSkater){
            throw { code: 400, msg: 'El usuario ya existe!'};
        }

        let pictureFile = foto;
        let uploadPath = path.join(__dirname, '../public/imgs/', pictureFile.name);
        
        pictureFile.mv(uploadPath, (err) => {
            if(err){
                throw { code: 500, msg: err}
            }
        })

        

        const user = await SkaterModel.create({email, name, password, anos_experiencia, especialidad, foto: pictureFile.name});


        const token = jwt.sign(
            {email: user.email},
            process.env.SECRET_JWT,
            { expiresIn: '1h'}
        )

        return res.cookie('token', token, {httpOnly: true}).json({token, email: user.email});
    } catch (error) {
        console.error(error);
        return res.status(error.code).json({ok: false, msg: error.msg});
    }
}


const editProfile = async(req, res) =>{
    try {
        const { email, name, password, anos_experiencia, especialidad } = req.body;

        const user = await SkaterModel.update(email, {name, password, anos_experiencia, especialidad});

        return res.json({ok: true, user});
    } catch (error) {
        console.error(error);
        return res.status(error.code).json({ok: false, msg: error.msg});
    }
}

const changeState = async(req, res)=>{
    try {
        
        const { email, state} = req.body;

        const user = await SkaterModel.changeState(email, state);

        return res.json({ok: true, user});
    } catch (error) {
        console.error(error);
        return res.status(error.code.json({ok: false, msg: error.msg}));
    }
}


const deleteAccount = async(req, res) =>{
    try {

        const { email } = req.body;

        const user = await SkaterModel.remove(email);

        return res.json({ok: true, user});
    } catch (error) {
        console.error(error);
        return res.status(error.code).json({ok: false, msg: error.msg});    
    }
}


const getUser = async(req, res) =>{
    try {
        const { email } = req.params;
        const user = await SkaterModel.oneByMail(email);
        if (!user) {
            throw { code: 404, msg: 'Usuario no encontrado.' };
        }
        return res.json({user});
    } catch (error) {
        console.error(error);
        return res.status(error.code).json({ok: false, msg: error.msg});   
    }
}


const getAll = async(req, res) =>{
    try {
        const users = await SkaterModel.all();
        return res.json({users});
    } catch (error) {
        console.error(error);
        return res.status(error.code).json({ok: false, msg: error.msg});   
    }
}

export const SkaterController = {
    login,
    register,
    editProfile,
    deleteAccount,
    changeState,
    getUser,
    getAll
}
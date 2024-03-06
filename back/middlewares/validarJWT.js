const jwt = require('jsonwebtoken');
const {response, request} = require('express')

const validarJWT = (req , res , next) => { 
    const token = req.header('x-token');  
    if (!token){
        return res.status(401).json({'msg':'No hay token en la petición.'});
    }
    try {
        const {uid, abilities} = jwt.verify(token, process.env.TOKENKEYWORD);
        req.uid = uid;
        req.abilities=abilities
        next();
        
    }catch(error){
        res.status(401).json({'msg':'Token no válido.'});
    }
}

module.exports = {
    validarJWT
}
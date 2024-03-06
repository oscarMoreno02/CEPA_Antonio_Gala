const jwt = require('jsonwebtoken')

//Óscar
const generarJWT = (uid,abilities,uname) => {
    
    let token = jwt.sign({ uid, abilities,uname }, process.env.TOKENKEYWORD, {
      });
    return token;
}

module.exports ={
    generarJWT
}

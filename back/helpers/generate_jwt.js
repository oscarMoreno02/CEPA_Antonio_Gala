const jwt = require('jsonwebtoken')


const generarJWT = (uid,abilities,uname) => {
    
    console.log("UID:" + uid)
    let token = jwt.sign({ uid, abilities,uname }, process.env.TOKENKEYWORD, {
      });
    return token;
}

module.exports ={
    generarJWT
}

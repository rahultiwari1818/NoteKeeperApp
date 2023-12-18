const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const fetchUser = (req,res,next) =>{

    const token = req.header("auth-token");
    if(!token){
        return res.status(401).send({"message":"Invalid Token.!","result":false});
    }

    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({"message":"Invalid Token.!","result":false});

    }

}

module.exports = fetchUser;
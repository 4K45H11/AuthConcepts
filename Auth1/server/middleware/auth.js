const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error: 'No token provided'});
    }

    // header is set in frontend via local or session //
    // Storage
    // Authorization: Bearer <your_jwt_token>

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded  // attach user data to the 
        // request
        next();
    }
    catch(error){
        return res.status(401).json({error: 'token is not valid'})
    }
}

module.exports = authMiddleware;
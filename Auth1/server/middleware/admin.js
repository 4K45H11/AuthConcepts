function adminOnly (req,res,next){
    if(req.user.role!=='admin'){
        res.status(403).json({error:'access denied admin only'});
    }
    next();
}

module.exports = adminOnly;
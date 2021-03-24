module.exports = function (app,mongodb,conf) {
    app.post('/code2session',(req,res)=>{
        if(req.param.openid){
            var collection = mongodb.collection('openid');
            collection.insert({openid:req.param.openid},(err,res)=>{
                if(err){
                    throw err;
                } else{
                    res.send("Success");
                }
            });
        } else{
            res.send("Default");
        }
    })
}
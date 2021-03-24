module.exports = function (app,mongodb,conf) {
    app.get('/code2session',(req,res)=>{
        console.log(req.query)
        if(req.query.openid){
            var collection = mongodb.collection('openid');
            collection.insertOne({openid:req.query.openid},(err,result)=>{
                if(err){
                    throw err;
                }
            });
            res.send("Success");
        } else{
            res.send("Default");
        }
    })
}
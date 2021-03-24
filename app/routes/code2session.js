module.exports = function (app,mongodb,conf) {
    app.get('/code2session',(req,res)=>{
        console.log(req.query)
        if(req.query.openid){
            var collection = mongodb.collection('openid');
            var filter = {openid:req.query.openid};
            collection.find(filter).toArray(function (err,res) {
                if (err) {
                    throw err;
                } else {
                    if(res.length==0){
                        collection.insertOne(filter,(err,result)=>{
                            if(err){
                                throw err;
                            } else {
                                console.log("Inserted Openid!");
                            }
                        });
                    }else{
                        console.log("已存在该记录");
                    }
                }
            })
            
            res.send("Success");
        } else{
            res.send("Default");
        }
    })
}
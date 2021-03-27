var qs = require('qs')
module.exports = function(app,mongodb,conf){
    app.get('/search',(req,res) => {
        mongodb.collection('notices').find().sort({"createTime":-1}).toArray((err,item) => {
            if(err) {
                res.send("Default")
            } else {
                res.send(item);
                console.log("共有通知："+item.length+"条");
            }
        });
    })
    app.get('/search/:keyword',(req,res)=>{
        var details = {'content':{$regex:req.params.keyword}};
        mongodb.collection('notices').find(details).sort({"createTime":-1}).toArray((err,item)=>{
            res.send(item);
        })
    })
}
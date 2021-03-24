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
}
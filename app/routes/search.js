var qs = require('qs')
module.exports = function(app,mongodb,conf){
    app.get('/search',(req,res) => {
        const details = {
            "nid" :"ff80808176d1aa5f01784878ee130069"
        }
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
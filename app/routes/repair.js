const getContent = require("../utils/getContent");


module.exports = function(app,mongodb,conf) {
    app.get('/repair',(req,res) => {
        var collection = mongodb.collection("notices");
        // collection.find({}).sort({"createTime":-1}).toArray((err,item)=>{
        //   if(err) {
        //     res.send("Default!");
        //   } else {
        //     res.send("Repairing...");
        //     // var newCillection = mongod b.collection("articles");
            
        //   }
        // });
        var time = 10000;
        collection.find({}).sort({"createTime":-1}).toArray().forEach(Element => {
          setTimeout(getContent(item.url,(ptext)=>{
            item.content = ptext;
            console.log(item);
          }),Math.random * time);
          res.send("repairing...")
        });
    })
}
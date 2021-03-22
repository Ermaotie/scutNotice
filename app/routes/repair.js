

module.exports = function(app,mongodb,conf) {
    app.get('/repair',(req,res) => {
        var collection = mongodb.collection("notices");
        collection.find({}).sort({"createTime":-1}).toArray((err,item)=>{
          if(err) {
            res.send("Default!");
          } else {
            res.send("Repairing...");
            // var newCillection = mongodb.collection("articles");
          }
        });
    })
}
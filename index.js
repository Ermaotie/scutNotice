module.exports = function() {
    var axios = require('axios');
    var qs = require('qs');
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://Ermaotie:Ermaotie@cluster0.xvlrf.mongodb.net/scutNotice?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const baseLink = 'http://jw.scut.edu.cn/zhinan/cms/article/view.do?type=posts&id='
    
    var data = qs.stringify({
        'category': '0',
        'tag': '0',
        'pageNum': '1',
        'pageSize': '10',
        'keyword': '' 
        });
    var config = {
          method: 'post',
          url: 'http://jw.scut.edu.cn/zhinan/cms/article/v2/findInformNotice.do',
          headers: { 
            'Referer': 'http://jw.scut.edu.cn/zhinan/cms/toPosts.do', 
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Cookie': 'JSESSIONID=9E851D9B9A1FCC6AC90D71C83104C77A; clwz_blc_pst_JWCx2djw=4211753326.20480'
          },
          data : data
    };
        
    
    axios(config)
      .then(function (response) {
          notices = response.data;
        //   console.log(notices.list);
        var nList = notices['list']
        .map(function(item) {
            return {
                "nid": item.id,
                "createTime" : item.createTime,
                "title" : item.title,
                "tag" : item.tag,
                "url" : baseLink + item.id
            }
        });
        
        console.log("list:"+nList);
        client.connect(err => {
            const collection = client.db("scutNotice").collection("notices");
            // perform actions on the collection object
            nList.forEach(element => {
                collection.find(element).toArray(function (err,res) {
                    console.log(res.length == 0);
                    if (res.length == 0) {
                        collection.insertOne(element,function(err,res) {
                            if (err) throw err;
                            console.log('Inserted')
                        })
                    }
                });
            });
          });
    })
      .catch(function (error) {
          console.log(error);
      });
}
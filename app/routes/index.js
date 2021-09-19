const searchRoutes = require('./search');
const repair = require('./repair');
const code2session = require('./code2session');
var getContent = require('../utils/getContent');
var sendMsg = require('../utils/pushMsg');
var {sendMail} = require('../utils/sendMail')
var axios = require('axios');
var qs = require('qs');
const getToken = require('../utils/getToken');
var rss = require('./rss')


module.exports = function(app, mongodb,conf) {
  // Other route groups could go here, in the future
  searchRoutes(app,mongodb,conf);
  code2session(app,mongodb,conf);
  rss(app)

  var data = [qs.stringify({
    'category': '0',
    'tag': '0',
    'pageNum': '1',
    'pageSize': '5',
    'keyword': '' 
    }),
    qs.stringify({
      'id': '4028b3556d5cc673016d5cecd0650000',
     'pageNum': '1',
     'pageSize': '20' 
     })
  ];
  var config = [{
        method: 'post',
        url: 'http://jw.scut.edu.cn/zhinan/cms/article/v2/findInformNotice.do',
        headers: { 
          'Referer': 'http://jw.scut.edu.cn/zhinan/cms/toPosts.do', 
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Cookie': 'JSESSIONID=9E851D9B9A1FCC6AC90D71C83104C77A; clwz_blc_pst_JWCx2djw=4211753326.20480'
        },
        data : data[0]
  },
  {
    method: 'post',
    url: 'http://jw.scut.edu.cn/zhinan/cms/category/getCategoryInfo.do',
    headers: { 
      'Accept-Encoding': ' gzip, deflate', 
      'Accept-Language': ' zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6', 
      'Content-Length': ' 57', 
      'Content-Type': ' application/x-www-form-urlencoded;charset=UTF-8', 
      'Referer': ' http://jw.scut.edu.cn/zhinan/cms/category/index.do?id=4028b3556d5cc673016d5cecd0650000', 
      'Cookie': 'JSESSIONID=C0902EEC7F6C5C753882597F7C2B7618; clwz_blc_pst_JWCx2djw=4211753326.20480'
    },
    data : data[1]
  }
  ];
  app.post('/', (req, res) => {
    // You'll create your note here.
    res.send("Running")
    for(var i=0;i<config.length;i++){
      axios(config[i])
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
              "url" : conf.baseLink + item.id
          }
      });
      console.log(nList)

      var collection = mongodb.collection("notices");
      // perform actions on the collection object
      nList.forEach(element => {
              collection.find(element).toArray(function (err,res) {
                  console.log(res.length == 0);
                  if (res.length == 0) {
                    getContent(element.url,function (value) {
                      element.content = value;
                      collection.insertOne(element,function(err,res) {
                        if (err) throw err;
                        console.log('Inserted: '+ element.title);
                        // sendMsg(mongodb,element);
                        sendMail(mongodb,element.content)
                        
                    })
                    });
                  }
              });
      });
    })
    .catch(function (error) {
        res.send('Default');
        console.log(error);
    });
    }
  });

  app.get('/', (req, res) => {
    // You'll create your note here.
    res.send("Running")
    for(var i=0;i<config.length;i++){
    axios(config[i])
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
              "url" : conf.baseLink + item.id
          }
      });

      var collection = mongodb.collection("notices");
      // perform actions on the collection object
      nList.forEach(element => {
              collection.find(element).toArray(function (err,res) {
                  console.log(res.length == 0);
                  if (res.length == 0) {
                    getContent(element.url,function (value) {
                      element.content = value;
                      collection.insertOne(element,function(err,res) {
                        if (err) throw err;
                        console.log('Inserted: '+ element.title);
                        // sendMsg(mongodb,element);
                        sendMail(mongodb,element.content)
                        
                    })
                    });
                  }
              });
      });
    })
    .catch(function (error) {
        res.send('Default');
        console.log(error);
    });
  }
  });
};
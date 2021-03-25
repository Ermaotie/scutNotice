const searchRoutes = require('./search');
const repair = require('./repair');
const code2session = require('./code2session');
var getContent = require('../utils/getContent');
var sendMsg = require('../utils/pushMsg');
var axios = require('axios');
var qs = require('qs');
const getToken = require('../utils/getToken');


module.exports = function(app, mongodb,conf) {
  // Other route groups could go here, in the future
  searchRoutes(app,mongodb,conf);
  code2session(app,mongodb,conf);

  var data = qs.stringify({
    'category': '0',
    'tag': '0',
    'pageNum': '1',
    'pageSize': '5',
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
  app.post('/', (req, res) => {
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
                        console.log('Inserted: '+ value.title);
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
    res.send('Success');
  });

  app.get('/', (req, res) => {
    // You'll create your note here.
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
                        console.log('Inserted: '+ value.title);
                        sendMsg(Element);
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
    res.send('Success');
  });
};
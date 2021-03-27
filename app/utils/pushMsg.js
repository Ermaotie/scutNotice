var axios = require('axios');
var getToken = require('./getToken');

module.exports = function (mongodb,item) {
    var openidColl = mongodb.collection('openid');
        getToken(function (token) {
            openidColl.find().toArray((err,res)=>{
                res.forEach(Element=>{
                    // 补充获取并持久化token
                    // 补充具体推送
                    var data = JSON.stringify({"touser":Element.openid,"template_id":"CtIBQyTF_Vv0RkWTNxNUdJLMU_YTabtF3xYRwgTY2EA","page":"note?nid="+Element.nid,"data":{"thing1":{"value":"教务通知"},"thing12":{"value":item.title.slice(0,16)+"..."},"time11":{"value":item.createTime},"thing10":{"value":"点击查看原文"}}});
                    console.log(item.title);
                    console.log(item.url);
                    var sendAPI = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token='+token;
                    var config = {
                        method: 'post',
                        url: sendAPI,
                        headers: { 
                          'Content-Type': 'application/json'
                        },
                        data : data
                      };
                      axios(config)
                      .then(function (response) {
                        console.log(JSON.stringify(response.data));
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                      
                })
            }); 
        });
}
var axios = require('axios');
const cheerioModule = require('cheerio');
var qs = require('qs');
var data = qs.stringify({
 'category': '0',
'tag': '0',
'pageNum': '1',
'pageSize': '20',
'keyword': '' 
});
var config = {
  method: 'post',
  url: 'http://jw.scut.edu.cn/zhinan/cms/article/v2/findInformNotice.do',
  headers: { 
    'Host': 'jw.scut.edu.cn', 
    'Origin': 'http://jw.scut.edu.cn', 
    'Referer': 'http://jw.scut.edu.cn/zhinan/cms/toPosts.do', 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Cookie': 'JSESSIONID=B64B0E9A7C58E0A5000F4EF6D5D2F478; clwz_blc_pst_JWCx2djw=4211753326.20480'
  },
  data : data
};

module.exports = function(app){
    app.get('/rss',(req,res) => {
        axios(config)
        .then(function (response) {
        return JSON.stringify(response.data);
    })
    .catch(function (error) {
        console.log(error);
        });
    })
}



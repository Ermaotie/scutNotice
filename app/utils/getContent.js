var cheerio = require('cheerio');
var axios = require('axios');

module.exports = function(url,callback){
    var config = {
        method: 'get',
        url: url,
        headers: { 
          'Cookie': 'JSESSIONID=414AD959C6867E95275BB963CDC9852B; clwz_blc_pst_JWCx2djw=4211753326.20480'
        }
      };
      axios(config)
      .then(function (response) {
        var $ = cheerio.load(response.data);
        var ptext = $('div[class=content]').html();
        console.log("获取文章内容成功");
        // console.log(ptext);
        // return ptext;
        callback(ptext);
      })
      .catch(function (error) {
        console.log(error);
      });
}
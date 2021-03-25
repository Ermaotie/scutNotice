var axios = require('axios');

module.exports = function (callback) {
    var config = {
        method: 'get',
        url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx4997ebd37d7e3e68&secret=4828a4bbe1120bf2eb55a7dd37fa1ea5',
        headers: {}
      };
      
      axios(config)
      .then(function (response) {
        if(response.data.access_token) {
          var token = response.data.access_token;
          callback(token);
        } else {
          console.log('Appid or secret is default!')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      
    // collection = mongodb.collection('token').
}
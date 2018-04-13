const request = require('request');

export function Sendnoti(data) {
    console.log(data);
    var resjson = {
        text: "test",
        id: "2217425031604903",
    };
    request({
        "uri": "https://colossal-penalty.glitch.me/sendmessages",
        "method": "POST",
        "json": resjson
    }, (err, res, body) => {
        if (!err) {
            console.log('Sended!');
        } else {
            console.error(err);
        }
    });
}
module.exports.Sendnoti = Sendnoti;

var counttime2 = setInterval(function() {
    var d = new Date();
    console.log("M " + d.getMinutes());
    // Sendnoti("data");

}, 60000); //second 1000 milli 100 60000 minute
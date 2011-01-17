var request = require('request'),
    jsdom = require('jsdom'),
    sys = require('sys');

request({uri:'http://www.barricane.com/demo.html'}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    //sys.puts(body);
    //body = "<html><body></body></html>";
    body = '<!DOCTYPE HTML>\
<html>\
<head>\
<title>demo</title>\
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" >\
<script type="text/javascript" src="http://www.barricane.com/demo.js"></script>\
<script type="text/javascript">\
document.write("hello");\
</script>\
</head>\
<body id="body">\
</body>\
</html>';
    var win = jsdom.jsdom(body).createWindow();
    jsdom.jQueryify(win, 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js', function (win, jquery) {
      console.log(win.jQuery("html").html());
    });
  }
});

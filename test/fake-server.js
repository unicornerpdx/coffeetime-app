var http = require('http'),
    url = require('url');

var server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "application/json" });

  var parsed = url.parse(request.url);

  if (parsed.pathname === "/auth") {
    response.write(JSON.stringify({
      "access_token": "abc123",
      "github_user_id": 123,
      "login": "JohnSmith",
      "name": "John Smith",
      "avatar_url": "https://github.com/images/error/octocat_happy.gif"
    }));
  }

  if (parsed.pathname === "/device/register") {
    response.write(JSON.stringify({
      "status": "OK"
    }));
  }

  if (parsed.pathname === "/group/list") {
    response.write(JSON.stringify([
      {
        "organization": "Special Place",
        "group_id": 123,
        "balance": 13
      },
      {
        "organization": "Bad Place",
        "group_id": 124,
        "balance": -3
      }
    ]));
  }

  response.end();
});

server.listen(8080);
console.log("Listening on port 8080");

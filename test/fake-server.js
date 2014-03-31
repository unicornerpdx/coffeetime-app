var http = require('http'),
    url = require('url');

var server = http.createServer(function (request, response) {
  response.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With"
  });

  var parsed = url.parse(request.url);

  if (parsed.pathname === "/auth") {
    response.write(JSON.stringify({
      "access_token": "abc123",
      "user_id": 123,
      "username": "JohnSmith",
      "display_name": "John Smith",
      "avatar_url": "http://placekitten.com/200/200"
    }));
  }

  if (parsed.pathname === "/device/register") {
    response.write(JSON.stringify({
      "status": "ok"
    }));
  }

  if (parsed.pathname === "/group/list") {
    response.write(JSON.stringify({
      "groups": [
        {
          "organization_name": "Special Place",
          "group_id": 123,
          "user_balance": 13
        },
        {
          "organization_name": "Bad Place",
          "group_id": 124,
          "user_balance": -3
        }
      ]
    }));
  }

  if (parsed.pathname === "/group/info" || parsed.pathname === "/transaction/create") {
    response.write(JSON.stringify({
    "organization_name": "Special Place",
    "user_balance": 123,
    "users": [
       {
          "user_id": 13,
          "username": "JohnSmith",
          "display_name": "John Smith",
          "avatar_url": "http://placekitten.com/200/200"
        },
        {
          "user_id": 12,
          "username": "JaneSmith",
          "display_name": "Jane Smith",
          "avatar_url": "http://placekitten.com/200/200"
        },
        {
          "user_id": 11,
          "username": "JoeBob",
          "display_name": "JoeBob",
          "avatar_url": "http://placekitten.com/200/200"
        }
      ],
      "transactions": [
        {
          "from_user_id": 13,
          "to_user_id": 14,
          "latitude": 45,
          "longitude": -122,
          "accuracy": 1000,
          "amount": 3,
          "note": "Sucker",
          "date": "2014-03-27T09:00:00-0700",
          "created_by": 13
        }
      ]
    }));
  }

  if (parsed.pathname === "/user/info") {
    response.write(JSON.stringify( {
        "user_id": 13,
        "username": "JohnSmith",
        "display_name": "John Smith",
        "avatar_url": "http://placekitten.com/200/200",
        "user_balance": 10,
        "active": false
    }));
  }

  response.end();
});

server.listen(8080);
console.log("Listening on port 8080");

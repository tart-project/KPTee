var server = require('ws').Server;
var s = new server({ port: 5001 });

const cards = []

// on()はイベントに対する処理を設定できる関数
s.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log("Received: " + message);
        cards.push(JSON.parse(message))

        s.clients.forEach(client => {
            if (client !== ws)
                client.send(JSON.stringify(cards));
        });
    });

    ws.on('close', function () {
        console.log('I lost a client');
    });

});



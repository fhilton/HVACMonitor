var connectionString = process.env.CONNECTION_STRING_DEVICE;
console.log(connectionString);
// use factory function from AMQP-specific package
var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
// AMQP-specific factory function returns Client object from core package
var client = clientFromConnectionString(connectionString);
// use Message object from core package
var Message = require('azure-iot-device').Message;
var connectCallback = function (err) {
    if (err) {
        console.error('Could not connect: ' + err);
    }
    else {
        console.log('Client connected');
        console.log(process.connected);
        setInterval(getTempAndSend, 5000);
    }
    ;
};
function getTempAndSend() {
    console.log('Sending Message');
    var spawn = require("child_process").spawn;
    var process = spawn('python', [__dirname + "/getStoveTemp.py"]);
    process.stderr.on('data', function (data) {
        console.log("stderr: " + data);
    });
    process.on('close', function (code) {
        console.log("child process exited with code " + code);
    });
    process.stdout.on('data', function (data) {
        // Do something with the data returned from python script
        console.log(data.toString());
        var msg = new Message(data.toString());
        client.sendEvent(msg, function (err) {
            if (err) {
                console.log(err.toString());
            }
            else {
                console.log('Message sent');
            }
            ;
        });
    });
}
client.open(connectCallback);
//# sourceMappingURL=IotHubTest.js.map
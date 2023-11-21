const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

const reCaptcha = LocalServiceRegistry.createService("http.captcha.verify", {

    createRequest: function (svc, args) {

        svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
        svc.setRequestMethod("POST");

        var secret = args.secret;
        var token = args.token;

        return `secret=${secret}&response=${token}`
    },

    parseResponse: function (svc, client) {
        var result

        try {
            result = JSON.parse(client.text);
        } catch (e) {
            result = client.text;
        }

        return result;
    },

});

module.exports = reCaptcha;
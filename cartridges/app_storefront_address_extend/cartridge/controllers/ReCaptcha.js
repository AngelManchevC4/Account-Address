'use strict';

/**
 * @namespace ReCaptcha
 */

var server = require('server');

server.post('Verify', server.middleware.https, function (req, res, next) {

    var Site = require('dw/system/Site');

    var token = req.form.token

    var { reCaptchaSiteKey, reCaptchaSecretKey, reCaptchaThreshold } = Site.getCurrent().getPreferences().custom;

    var reCaptchaConfig = {
        siteKey: reCaptchaSiteKey,
        threshold: reCaptchaThreshold,
        secretKey: reCaptchaSecretKey,
    };

    var reCaptcha = require("~/cartridge/scripts/services/reCaptcha");

    var response = reCaptcha.call({ token: token, secret: reCaptchaConfig.secretKey }).object;

    var siteThreshold = reCaptchaConfig.threshold;

    if (response.score >= siteThreshold) {
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false,
            errorMessage: Resource.msg('error.message.account.create.error', 'forms', null)
        })
    }

    return next();

})

module.exports = server.exports();
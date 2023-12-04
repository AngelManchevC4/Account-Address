'use strict';

/**
 * @namespace ReCaptcha
 */

var server = require('server');

var reCaptchaConfig = require("~/cartridge/scripts/middlewares/reCaptcha");

server.post('Verify', server.middleware.https, reCaptchaConfig.configureRecaptcha, function (req, res, next) {

    var token = req.form.token

    var reCaptchaConfig = res.getViewData().reCaptcha;

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

/**
 * @namespace Login
 */

var server = require('server');
server.extend(module.superModule);

var reCaptchaConfig = require("~/cartridge/scripts/middlewares/reCaptcha");

/**
 * Login-Show : This endpoint is called to load the login page
 * @name Base/Login-Show
 * @function
 * @memberof Login
 * @param {category} - sensitive
 * @param {serverfunction} - get
 */
server.append('Show', reCaptchaConfig.configureRecaptcha);

module.exports = server.exports();
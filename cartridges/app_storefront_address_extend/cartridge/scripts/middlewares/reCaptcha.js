function configureRecaptcha(req, res, next) {
    
    const URLUtils = require('dw/web/URLUtils');
    const Site = require('dw/system/Site');

    var { reCaptchaSiteKey, reCaptchaSecretKey, reCaptchaThreshold } = Site.getCurrent().getPreferences().custom;

    var reCaptchaConfig = {
        siteKey: reCaptchaSiteKey,
        threshold: reCaptchaThreshold,
        secretKey: reCaptchaSecretKey,
        verifyUrl: URLUtils.url('ReCaptcha-Verify')
    };

    const viewData = res.getViewData();

    viewData.reCaptcha = reCaptchaConfig;

    res.setViewData(viewData);

    next();
}

module.exports = {
    configureRecaptcha,
};
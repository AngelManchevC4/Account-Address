'use strict';

/**
 * @namespace Checkout
 */

var server = require('server');

var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.extend(module.superModule);

/**
 * Main entry point for Checkout
 */

/**
 * Checkout-Begin : The Checkout-Begin endpoint will render the checkout shipping page for both guest shopper and returning shopper
 * @name Base/Checkout-Begin
 * @function
 * @memberof Checkout
 * @param {middleware} - server.middleware.https
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - csrfProtection.generateToken
 * @param {querystringparameter} - stage - a flag indicates the checkout stage
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.append(
    'Begin',
    function (req, res, next) {
        var BasketMgr = require('dw/order/BasketMgr');
        var collections = require('*/cartridge/scripts/util/collections');

        var currentBasket = BasketMgr.getCurrentBasket();

        var billingAddress = currentBasket.billingAddress;

        var currentCustomer = req.currentCustomer.raw;

        var preferredAddress;

        // only true if customer is registered
        if (req.currentCustomer.addressBook && req.currentCustomer.addressBook.preferredAddress) {
            var shipments = currentBasket.shipments;
            preferredAddress = req.currentCustomer.addressBook.preferredAddress;
            preferredAddress.vat = req.currentCustomer.addressBook.preferredAddress.raw.custom.vat

            collections.forEach(shipments, function (shipment) {
                if (!shipment.shippingAddress) {
                    COHelpers.copyCustomerAddressToShipment(preferredAddress, shipment);
                }
            });

            if (!billingAddress) {
                COHelpers.copyCustomerAddressToBilling(preferredAddress);
            }
        }

        var shippingForm = COHelpers.prepareShippingForm();
        var billingForm = COHelpers.prepareBillingForm();

        if (preferredAddress) {
            shippingForm.copyFrom(preferredAddress);
            shippingForm.shippingAddress.addressFields.vat.htmlValue = preferredAddress.raw.custom.vat;
            billingForm.copyFrom(preferredAddress);
            billingForm.addressFields.vat.htmlValue = preferredAddress.raw.custom.vat;
        }

        res.render('checkout/checkout', {
            forms: {
                shippingForm: shippingForm,
                billingForm: billingForm
            }
        });

        return next();
    }
);


module.exports = server.exports();

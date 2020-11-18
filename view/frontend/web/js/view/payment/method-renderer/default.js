/*browser:true*/
/*global define*/
define(
    [
        'jquery',
        'Magento_Checkout/js/view/payment/default',
        'mage/url',
        'Magento_Checkout/js/action/place-order',
        'Magento_Checkout/js/model/quote'
    ],
    function ($, Component, url, placeOrderAction, quote) {
        'use strict';
        return Component.extend({
            redirectAfterPlaceOrder: false,

            defaults: {
                template: 'Paynl_Payment/payment/default'
            },
            isVisible:function(){
                var currentShippingMethod = "";
                if (typeof quote.shippingMethod().carrier_code !== 'undefined' && typeof quote.shippingMethod().method_code !== 'undefined') {
                    currentShippingMethod = quote.shippingMethod().carrier_code+'_'+quote.shippingMethod().method_code;
                }
                else if(typeof quote.shippingMethod().method_code !== 'undefined'){
                    currentShippingMethod = quote.shippingMethod().method_code;
                }
                var disallowedShippingMethods = [];
                if(this.getDisallowedShipping()){
                    disallowedShippingMethods = this.getDisallowedShipping().split(',');
                }
                if(disallowedShippingMethods.includes(currentShippingMethod)  && currentShippingMethod.length > 0){
                    return false;
                }
                if(this.getforCompany() == 1 && this.getCompany().length != 0){
                    return false;
                }
                if(this.getforCompany() == 2 && this.getCompany().length == 0){
                    return false;
                }
                return true;
            },
            getDisallowedShipping: function () {
                return window.checkoutConfig.payment.disallowedshipping[this.item.method];
            },  
            getCompany: function () {                
                if (typeof quote.billingAddress._latestValue.company !== 'undefined') {
                    return quote.billingAddress._latestValue.company;
                }
                return '';                
            },    
            getforCompany   : function () {
                return window.checkoutConfig.payment.showforcompany[this.item.method];
            },  
            getInstructions: function () {
                return window.checkoutConfig.payment.instructions[this.item.method];
            },
            getPaymentIcon: function () {
                return window.checkoutConfig.payment.icon[this.item.method];
            },
            
            afterPlaceOrder: function () {
                window.location.replace(url.build('/paynl/checkout/redirect?nocache='+ (new Date().getTime())));
            },

        });
    }
);
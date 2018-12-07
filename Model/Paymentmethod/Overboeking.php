<?php
/**
 * Copyright © 2015 Pay.nl All rights reserved.
 */

namespace Paynl\Payment\Model\Paymentmethod;

/**
 * Description of Ideal
 *
 * @author Andy Pieters <andy@pay.nl>
 */
class Overboeking extends PaymentMethod
{
    protected $_code = 'paynl_payment_overboeking';

    protected function getDefaultPaymentOptionId()
    {
        return 136;
    }
}
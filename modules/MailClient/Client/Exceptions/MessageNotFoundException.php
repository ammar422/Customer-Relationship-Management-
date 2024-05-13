<?php
/**
 * Concord CRM - https://www.concordcrm.com
 *
 * @version   1.3.5
 *
 * @link      Releases - https://www.concordcrm.com/releases
 * @link      Terms Of Service - https://www.concordcrm.com/terms
 *
 * @copyright Copyright (c) 2022-2024 KONKORD DIGITAL
 */

namespace Modules\MailClient\Client\Exceptions;

use Exception;
use Throwable;

class MessageNotFoundException extends Exception
{
    public function __construct($message = '', $code = 0, ?Throwable $previous = null)
    {
        parent::__construct(
            "The message does not exist on remote server. {$message}",
            $code,
            $previous
        );
    }
}

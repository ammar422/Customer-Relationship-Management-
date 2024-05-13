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

namespace Modules\Contacts\Resourceables;

use Modules\Contacts\Http\Resources\SourceResource;
use Modules\Core\Contracts\Resources\HasOperations;
use Modules\Core\Fields\Text;
use Modules\Core\Http\Requests\ResourceRequest;
use Modules\Core\Resource\Resource;

class Source extends Resource implements HasOperations
{
    /**
     * The column the records should be default ordered by when retrieving
     */
    public static string $orderBy = 'name';

    /**
     * The model the resource is related to
     */
    public static string $model = 'Modules\Contacts\Models\Source';

    /**
     * Get the json resource that should be used for json response
     */
    public function jsonResource(): string
    {
        return SourceResource::class;
    }

    /**
     * Set the available resource fields
     */
    public function fields(ResourceRequest $request): array
    {
        return [
            Text::make('name', __('contacts::source.source'))->rules(['required', 'string', 'max:191'])->unique(static::$model),
        ];
    }

    /**
     * Get the displayable singular label of the resource
     */
    public static function singularLabel(): string
    {
        return __('contacts::source.source');
    }

    /**
     * Get the displayable label of the resource
     */
    public static function label(): string
    {
        return __('contacts::source.sources');
    }
}

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

return [
    'activities' => 'Задачи',
    'activity' => 'Задача',
    'add' => 'Создать задачу',
    'description' => 'Описание',
    'description_info' => 'Описание доступно всем',
    'note' => 'Примечание',
    'note_info' => 'Примечания являются конфиденциальными и видны только менеджерам',
    'title' => 'Название',
    'due_date' => 'Срок закрытия',
    'end_date' => 'Дата окончания',
    'create' => 'Создать задачу',
    'download_ics' => 'Скачать файл .ics',
    'created' => 'Задача успешно создана',
    'updated' => 'Задача успешно изменена',
    'deleted' => 'Задача успешно удалена',
    'export' => 'Экспорт задач',
    'import' => 'Импорт задач',
    'guests' => 'Гости',
    'guest' => 'Гость',
    'count_guests' => '1 гость | :count гостя',
    'create_follow_up_task' => 'Создать связанную задачу',
    'follow_up_with_title' => 'Связать с :with',
    'title_via_create_message' => 'Связана с письмом: :subject',
    'reminder_update_info' => 'Поскольку напоминание для это1 задачи уже отправлено, вам нужно будет обновить дату выполнения, чтобы новое напоминание было помещено в очередь.',
    'owner_assigned_date' => 'Дата, назначенная ответственным',
    'reminder_sent_date' => 'Дата отправки напоминания',
    'reminder' => 'Напоминание',
    'owner' => 'Ответственный',
    'mark_as_completed' => 'Отметить как Выполненная',
    'mark_as_incomplete' => 'Отметить как Незавершенная',
    'is_completed' => 'Завершено',
    'completed_at' => 'Завершено в',
    'overdue' => 'Просроченная',
    'doesnt_have_activities' => 'Нет задач',
    'count' => 'Нет задач | 1 задача | :count задачи',
    'incomplete_activities' => 'Незавершенные задачи',
    'activity_was_due' => 'Задача должна быть закрыта :date',
    'next_activity_date' => 'Следующая дата задачи',
    'next_activity_date_info' => 'Это поле доступно только для чтения и автоматически обновляется на основе записи предстоящих действий, указывает, когда менеджеру следует предпринять следующее действие.',
    'cards' => [
        'my_activities' => 'Мои задачи',
        'my_activities_info' => 'Эти карточки отражают действия, которые вы добавили в качестве ответственного',
        'created_by_agent' => 'Задачи, созданные менеджером',
        'created_by_agent_info' => 'Просмотрите количество действий, созданных каждым менеджером. Посмотрите, кто создает больше всего активности, а кто - меньше всего.',
        'upcoming' => 'Предстоящие задачи',
        'upcoming_info' => 'Эта карточка отражает предстоящие ваши задачи и задачи, на которых вас отметили',
    ],
    'type' => [
        'default_type' => 'Тип задачи по умолчанию',
        'delete_primary_warning' => 'Вы не можете удалить тип задачи по умолчанию',
        'delete_usage_warning' => 'Этот тип уже связан с задачами, поэтому, не может быть удален.',
        'delete_usage_calendars_warning' => 'Этот тип используется по умолчанию при создании задач через подключенные календари, поэтому, не может быть удален.',
        'delete_is_default' => 'Это тип задачи стоит по умолчанию, поэтому, он не может быть удален.',
        'type' => 'Тип задачи',
        'types' => 'Типы задач',
        'name' => 'Имя',
        'icon' => 'Иконка',
    ],
    'filters' => [
        'activity_type_disabled' => 'Тип задачи используется в текущем фильтре, поэтому, вы не можете выбрать тип задачи в этом разделе',
        'open' => 'Открытые задачи',
        'due_today' => 'Дата закрытия сегодня',
        'due_this_week' => 'Дата закрытия эта неделя',
        'display' => [
            'has' => 'есть задачи :value:',
            'overdue' => 'есть :value: задачи',
            'doesnt_have_activities' => 'нет открытых задач',
        ],
        'all' => 'Все',
        'today' => 'Сегодня',
        'tomorrow' => 'Завтра',
        'this_week' => 'Эта неделя',
        'next_week' => 'Следующая неделя',
        'done' => 'Закрытые',
        'done_empty_state' => 'Выполненные задачи будут показаны здесь.',
    ],
    'settings' => [
        'send_contact_email' => 'Отправил контактам шаблон письма "Контакт следит за активностью"',
        'send_contact_email_info' => 'Если включено, то при добавлении контакта в качестве гостя в задачу будет отправлен шаблон электронного письма  с прикрепленным файлом .ics и информацией о задачи.',
    ],
    'manage_activities' => 'Управление задачами',
    'info' => 'Планируйте и управляйте задачами с контактами и менеджерами.',
    'timeline' => [
        'heading' => 'Задача была создана',
    ],
    'permissions' => [
        'attends_and_owned' => 'Посещает и принадлежит только',
    ],
    'actions' => [
        'update_type' => 'Изменить тип',
    ],
    'notifications' => [
        'due' => 'Ваша :activity задача должна быть закрыта :date',
        'assigned' => 'Вам пришла задача :name от :user',
        'added_as_guest' => 'Вы были добавлены в качестве гостя к задаче',
    ],
    'mail_placeholders' => [
        'assigneer' => 'Пользователь, который поставил задачу',
    ],
    'validation' => [
        'end_date' => [
            'less_than_due' => 'Дата окончания не должна быть меньше даты выполнения.',
        ],
        'end_time' => [
            'required_when_end_date_is_in_future' => 'Вы должны указать время окончания, если дата окончания приходится на другой день.',
        ],
    ],
    'workflows' => [
        'actions' => [
            'create' => 'Создать задачу',
        ],
        'fields' => [
            'create' => [
                'title' => 'С названием задачи',
                'note' => 'Добавить примечание (необязательно)',
            ],
        ],
    ],
    'metrics' => [
        'todays' => 'Сегодняшние задачи',
    ],
    'empty_state' => [
        'title' => 'Вы не создавали задачи',
        'description' => 'Создайте новую задачу',
    ],
];

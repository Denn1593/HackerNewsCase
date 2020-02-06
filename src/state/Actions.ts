interface Action
{
    type: ActionType,
    payload: any;
}

enum ActionType
{
    SET_ERROR_MESSAGE,
    SET_STORIES,
    SET_FECTHING,
    SET_LANGUAGE
}

export {ActionType, Action};
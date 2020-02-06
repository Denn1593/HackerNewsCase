import {combineReducers} from "redux";
import {Story} from "../model/HackerNews";
import { ActionType, Action } from "./Actions";


interface ApplicationState
{
    errorMessage: string;
    stories: Story[];
    language: string;
    fetching: boolean;
}

const initialState: ApplicationState = {
    errorMessage: "",
    stories: [],
    language: "english",
    fetching: false
}

const storyReducer = (newState: ApplicationState = initialState, action: Action)=>
{
    switch(action.type)
    {
        case ActionType.SET_ERROR_MESSAGE:
        {
            let state: ApplicationState = {...newState};

            state.errorMessage = action.payload.errorMessage;

            return state;
        }
        case ActionType.SET_STORIES:
        {
            let state: ApplicationState = {...newState};
            
            state.stories = action.payload.stories;
            state.fetching = false;

            return state;
        }
        case ActionType.SET_FECTHING:
        {
            let state: ApplicationState = {...newState};

            state.fetching = action.payload.fetching;

            return state;
        }
        case ActionType.SET_LANGUAGE:
        {
            let state: ApplicationState = {...newState};
            
            state.language = action.payload.language;

            return state;
        }
        default:
            return newState;
    }
}

export default storyReducer;
export {ApplicationState};
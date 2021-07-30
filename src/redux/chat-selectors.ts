import { AppStateType } from "./redux-store";

export const selectWSStatus = (state: AppStateType) => {
    return state.chat.status
}
import {useContext} from "react";
import {UserContext} from "../../context/user.context.jsx";

export const INITIAL_STATE = {
    isValid: {
        post: true,
        title: true,
        date: true
    },
    values: {
        post: '',
        title: '',
        date: '',
        tag: '',
        userId: 1
    },
    isFormReadyToSubmit: false
}

export function formReducer(state, action) {
    switch (action.type) {
        case 'RESET_VALIDITY':
            return{...state, isValid: INITIAL_STATE.isValid}
        case 'SUBMIT':{
            const titleValidity = state.values.title?.trim().length
            const postValidity = state.values.post?.trim().length
            const dataValidity = state.values.date
            const user = state.values.userId
            return {
                ...state,
                isValid: {
                    post: postValidity,
                    title: titleValidity,
                    date: dataValidity,
                    userId: user
                },
                isFormReadyToSubmit: titleValidity && postValidity && dataValidity
            }
        }
        case 'SET_VALUE': {
            return {...state, values:
                    {...state.values, ...action.payload}};
        }
        case 'CLEAR': {
            return {...state,
                values: INITIAL_STATE.values,
                isFormReadyToSubmit: false}
        }
    }
}
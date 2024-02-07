import style from './JournalForm.module.css'
import {useEffect, useReducer, useRef} from 'react';
import Button from '../Button/Button.jsx';
import classNames from "classnames";
import {formReducer, INITIAL_STATE} from "./JournalForm.js";
import Input from "../Input/Input.jsx";
function JournalForm({addItem}) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = useRef()
    const dateRef = useRef()
    const postRef = useRef()
    const focusError = ()=>{
        switch (true){
            case !isValid.title:
                titleRef.current.focus()
                break
            case !isValid.date:
                dateRef.current.focus()
                break
            case !isValid.post:
                postRef.current.focus()
                break
        }
    }
   useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.post || !isValid.title) {
            focusError(isValid)
            timerId = setTimeout(() => {
                dispatchForm({ type: 'RESET_VALIDITY' });
            }, 2000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isValid]);
    useEffect(() => {
        if (isFormReadyToSubmit) {
            addItem(values);
            dispatchForm({ type: 'CLEAR' });
            dispatchForm({ type: 'SET_VALUE'});
        }
    }, [isFormReadyToSubmit, values, addItem]);
    const inputChange = (e)=>{
        dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value }});
    }
    const addJournalItem = (e)=>{
        e.preventDefault()
        dispatchForm({ type: 'SUBMIT' });
    }
    return(
        <form className={style['journal-form']} onSubmit={addJournalItem}>
            <div>
                <Input isValid={isValid.title} ref={titleRef} type='text' name='title' value={values.title} onChange={inputChange} appearence='title'/>
            </div>
            <div className={style['form-row']}>
                <label htmlFor='date' className={style['form-label']}>
                    <img src='/calendar.svg' alt='Календарь'/>
                    <span>Дата</span></label>
                <Input isValid={isValid.date} ref={dateRef} type="date" name='date' value={values.date} onChange={inputChange} />
            </div>
            <div className={style['form-row']}>
                <label htmlFor='tag' className={style['form-label']}>
                    <img src='/folder.svg' alt='Папка'/>
                    <span>Метки</span></label>
                <Input isValid={isValid.tag} type='text' name='tag' value={values.tag} onChange={inputChange}/>
            </div>
            <textarea ref={postRef} name="post" className={classNames(style.input,
                {[style.invalid]: !isValid.post}
                )} value={values.post} onChange={inputChange}></textarea>
            <Button text='Сохранить'/>
        </form>
    )
}
export default JournalForm
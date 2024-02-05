import style from './JournalForm.module.css'
import {useEffect, useReducer} from 'react';
import Button from '../Button/Button.jsx';
import classNames from "classnames";
import {formReducer, INITIAL_STATE} from "./JournalForm.js";
function JournalForm({addItem}) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.post || !isValid.title) {
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
                <input type='text' name='title' value={values.title} onChange={inputChange} className={classNames(style['input-title'], {
                    [style['invalid']]: !isValid.title})}/>
            </div>
            <div className={style['form-row']}>
                <label htmlFor='date' className={style['form-label']}>
                    <img src='/calendar.svg' alt='Календарь'/>
                    <span>Дата</span></label>
                <input type="date" name='date' value={values.date} onChange={inputChange} className={classNames(style['input'],
                    {[style.invalid]: !isValid.date})}/>
            </div>
            <div className={style['form-row']}>
                <label htmlFor='tag' className={style['form-label']}>
                    <img src='/folder.svg' alt='Папка'/>
                    <span>Метки</span></label>
                <input type='text' name='tag' value={values.tag} onChange={inputChange} className={style.input}/>
            </div>
            <textarea name="post" className={classNames(style.input,
                {[style.invalid]: !isValid.post}
                )} value={values.post} onChange={inputChange}></textarea>
            <Button text='Сохранить'/>
        </form>
    )
}
export default JournalForm
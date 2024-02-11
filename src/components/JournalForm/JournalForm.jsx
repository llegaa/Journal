import style from './JournalForm.module.css'
import {useContext, useEffect, useReducer, useRef} from 'react';
import Button from '../Button/Button.jsx';
import classNames from "classnames";
import {formReducer, INITIAL_STATE} from "./JournalForm.js";
import Input from "../Input/Input.jsx";
import {UserContext} from "../../context/user.context.jsx";
function JournalForm({addItem, data, onDelete}) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = useRef()
    const dateRef = useRef()
    const postRef = useRef()
    const {userId} = useContext(UserContext)
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
            dispatchForm({ type: 'SET_VALUE', payload: {userId}});
        }
    }, [isFormReadyToSubmit, values, addItem, userId]);
    useEffect(()=>{
        dispatchForm({ type: 'SET_VALUE', payload: {userId}});
    }, [userId])
    useEffect(()=>{
        if(!data){
            dispatchForm({ type: 'CLEAR' });
            dispatchForm({ type: 'SET_VALUE', payload: {userId}});
        }
        dispatchForm({ type: 'SET_VALUE', payload: {...data}});
    },[data])
    const inputChange = (e)=>{
        dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value }});
    }
    const addJournalItem = (e)=>{
        e.preventDefault()
        dispatchForm({ type: 'SUBMIT'});
    }
    const deleteJournalItem = ()=>{
        onDelete(data.id)
        dispatchForm({ type: 'CLEAR' });
        dispatchForm({ type: 'SET_VALUE', payload: {userId}});
    }
    return(
                <form className={style['journal-form']} onSubmit={addJournalItem}>
                    {userId}
                    <div className={style['form-row']}>
                        <Input isValid={isValid.title} ref={titleRef} type='text' name='title' value={values.title} onChange={inputChange} appearence='title'/>
                        {data?.id && <button className={style['delete']} type="button" onClick={deleteJournalItem}>
                            <img src='/archive.svg' alt="Кнопка удалить"/>
                        </button>}
                    </div>
                    <div className={style['form-row']}>
                        <label htmlFor='date' className={style['form-label']}>
                            <img src='/calendar.svg' alt='Календарь'/>
                            <span>Дата</span></label>
                        <Input isValid={isValid.date} ref={dateRef} type="date" name='date' value={values.date ? new Date(values.date).toISOString().slice(0,10) : ''} onChange={inputChange} />
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
                    <Button>Сохранить</Button>
                </form>
    )
}
export default JournalForm
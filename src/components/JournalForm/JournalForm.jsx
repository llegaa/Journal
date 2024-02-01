import './JournalForm.css'
import {useState} from "react";
import Button from "../Button/Button.jsx";
function JournalForm() {
    const [inputData, setInputData] = useState('')
    const inputChange = (e)=>{
        setInputData(e.target.value)
    }
    const addJournalItem = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const formProps = Object.fromEntries(formData)
        console.log(formProps)
    }
    return(
        <form className='journal-form' onSubmit={addJournalItem}>
            <input type='text' name='title'/>
            <input type="date" name='date'/>
            <input type='text' name='tag' value={inputData} onChange={inputChange}/>
            <textarea name="post"></textarea>
            <Button text='Сохранить'/>
        </form>
    )
}
export default JournalForm
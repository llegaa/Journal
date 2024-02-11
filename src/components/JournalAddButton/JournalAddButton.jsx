import './JournalAddButton.css'
import CardButton from '../CardButton/CardButton.jsx';
function JournalAddButton({clearForm}) {
    return(
        <CardButton onClick={clearForm} className="journal-add">
            <img src='/plus.png' alt='Плюс'/>
            Новое воспоминание
        </CardButton>
    )
}
export default JournalAddButton
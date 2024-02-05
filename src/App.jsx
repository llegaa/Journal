import './App.css'
import Button from './components/Button/Button.jsx';
import JournalItem from "./components/JournalItem/JournalItem.jsx";
import CardButton from "./components/CardButton/CardButton.jsx";
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Body from "./layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import JournalForm from "./components/JournalForm/JournalForm.jsx";
import {useEffect, useState} from "react";

function App() {
    const [items, setItems] = useState([])

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('data'))
        if(data){
            setItems(data.map(item=>({
                ...item,
                date: new Date(item.date)
            })))
        }
    }, [])
    useEffect(()=>{
        if(items.length){
            localStorage.setItem('data', JSON.stringify(items))
        }
    }, [items])
 const addItem = (item)=>{
        debugger
        setItems(data=> [...data, {
            id: data.length>0 ? Math.max(...data.map(i=>i.id))+1 : 1,
            post: item.post,
            title: item.title,
            tag: item.tag,
            date: new Date(item.date)
        }])
    }
    const sortItems = (a, b) => {
        if(a.date < b.date){
            return 1
        } else return -1
    }
  return (
    <div className='app'>
        <LeftPanel>
            <Header/>
            <JournalAddButton/>
            <JournalList>
                {items.length===0 ? <p>Запесей пока нет, добавьте первую</p> : items.sort(sortItems).map(el=> <CardButton key={el.id}><JournalItem
                    title={el.title}
                    post={el.post}
                    date={el.date}></JournalItem></CardButton>)}
            </JournalList>
        </LeftPanel>
        <Body>
            <JournalForm addItem={addItem}/>
        </Body>
    </div>
  )
}

export default App;


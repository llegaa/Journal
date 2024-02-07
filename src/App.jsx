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
import {useLocalstorage} from "./hooks/use-localstorage.hook.js";

function mapItems(items) {
    if (!items) {
        return [];
    }
    return items.map(i => ({
        ...i,
        date: new Date(i.date)
    }));
}
function App() {
    const [items, setItems] = useLocalstorage('data')

    const addItem = item => {
        if (!item.id) {
            setItems([...mapItems(items), {
                ...item,
                date: new Date(item.date),
                id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
            }]);
        } else {
            setItems([...mapItems(items).map(i => {
                if (i.id === item.id) {
                    return {
                        ...item
                    };
                }
                return i;
            })]);
        }
    };
  return (
    <div className='app'>
        <LeftPanel>
            <Header/>
            <JournalAddButton/>
            <JournalList items={mapItems(items)}>
            </JournalList>
        </LeftPanel>
        <Body>
            <JournalForm addItem={addItem}/>
        </Body>
    </div>
  )
}

export default App;


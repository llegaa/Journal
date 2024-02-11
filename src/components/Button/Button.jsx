import './Button.css'
import {memo} from "react";
function Button({children, onClick}){
    return(
            <button onClick={onClick} className='button accent'>{children}</button>
    )
}
export default memo(Button)
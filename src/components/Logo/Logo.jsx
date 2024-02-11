import style from './Logo.module.css'
function Logo({image}){
    return <img className={style.logo} src={image} alt="Логотип журнала"/>
}

export default Logo
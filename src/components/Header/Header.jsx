import SelectUser from "../SelectUser/SelectUser.jsx";
import Logo from "../Logo/Logo.jsx";

function Header() {
    return(<>
            <Logo image='/logo.svg'/>
            <SelectUser />
        </>
    )
}
export default Header
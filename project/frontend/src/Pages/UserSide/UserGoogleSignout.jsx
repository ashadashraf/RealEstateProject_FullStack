import { GoogleLogout } from 'react-google-login';
import '../../App.css';
import { setShowIsGoogleLoggedin } from '../../Redux/authModal/isGoogleLoggedinSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setShowIsLoggedin } from '../../Redux/authModal/isLoggedinSlice';
import { GoogleClientId } from '../../Services/Keys';

const clientId = GoogleClientId;

function UserGoogleSignout() {
    const dispatch = useDispatch();
    const showIsGoogleLoggedin = useSelector(state => state.showIsGoogleLoggedin.value);
    const showIsLoggedin = useSelector(state => state.showIsLoggedin.value);

    const onSuccess = () => {
        console.log("Log out successfull!");
        localStorage.removeItem('accessToken');
        dispatch(
            setShowIsGoogleLoggedin({
                showIsGoogleLoggedin: false
            })
        )
        dispatch(
            setShowIsLoggedin({
                showIsLoggedin: false
            })
        )
        console.log('normal',showIsLoggedin, 'google', showIsGoogleLoggedin);
        window.location.href = '/';
    }
    return (
        <div id='googleSignInButton'>
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
                className='googlebutton'
            />
        </div>
    )
}

export default UserGoogleSignout;
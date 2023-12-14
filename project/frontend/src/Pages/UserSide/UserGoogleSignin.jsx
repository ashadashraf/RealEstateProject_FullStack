import { GoogleLogin } from 'react-google-login';
import '../../App.css';
import { gapi } from 'gapi-script';
import { useDispatch, useSelector } from 'react-redux';
import { setShowIsLoggedin } from '../../Redux/authModal/isLoggedinSlice';
import { setShowIsGoogleLoggedin } from '../../Redux/authModal/isGoogleLoggedinSlice';
import { GoogleClientId } from '../../Services/Keys';

const clientId = GoogleClientId;

function UserGoogleSignin() {
    const dispatch = useDispatch();
    const showIsLoggedin = useSelector(state => state.showIsLoggedin.value);
    const showIsGoogleLoggedin = useSelector(state => state.showIsGoogleLoggedin.value);

    const onSuccess = (res) => {
        console.log("Login Success! Current user:", res.profileObj);
        console.log('normal',showIsLoggedin, 'google', showIsGoogleLoggedin);
        googleSignin();
    }

    const onFailure = (res) => {
        console.log("Login Failed! res:", res);
    }

    const googleSignin = () => {
        var accessToken = gapi.auth.getToken().access_token;
        console.log(accessToken);
        localStorage.setItem('accessToken', accessToken);

        dispatch(
            setShowIsLoggedin({
                showIsLoggedin: true
            })
        )
        dispatch(
            setShowIsGoogleLoggedin({
                showIsGoogleLoggedin: true
            })
        )
        console.log('normal',showIsLoggedin, 'google', showIsGoogleLoggedin);

    }
    
    return (
        <div id='googleSignInButton'>
            <GoogleLogin
                clientId={clientId}
                buttonText='Continue with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                className='googlebutton'
            />
        </div>
    )
}


export default UserGoogleSignin;
import { GoogleLogin } from 'react-google-login';
import '../../App.css';
import { gapi } from 'gapi-script';
import { useDispatch, useSelector } from 'react-redux';
import { setShowIsLoggedin, setUserId, setUsername } from '../../Redux/authModal/isLoggedinSlice';
import { setShowIsGoogleLoggedin } from '../../Redux/authModal/isGoogleLoggedinSlice';
import { GoogleClientId } from '../../Services/Keys';
// import { constructApiUrl } from '../../Services/ApiUtils';

const clientId = GoogleClientId;

function UserGoogleSignin() {
    const dispatch = useDispatch();
    const showIsLoggedin = useSelector(state => state.showIsLoggedin.value);
    const showIsGoogleLoggedin = useSelector(state => state.showIsGoogleLoggedin.value);
    // const showSigninModal = useSelector(state => state.showSigninModal.value);
    // const showSignupModal = useSelector(state => state.showSignupModal.value);
    
    const onSuccess = async (res) => {
        console.log("Login Success! Current user:", res.profileObj);
        // try {
        //     const apiEndpoint = 'api/auth/googlelogin/';
        //     // const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        //     const response = await fetch(constructApiUrl(apiEndpoint), {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify(res.profileObj),
        //     });
      
        //     if (response.ok) {
        //       console.log(response);
        //       const data = await response.json();
        //       const accessToken = data.access;
      
        //       localStorage.setItem('accessToken', accessToken);
        //       dispatch(setShowIsLoggedin({
        //         showIsLoggedin: true
        //       }))
        //       dispatch(setUserId({
        //         userId: data.user.user_id
        //       }))
        //       dispatch(setUsername({
        //         username: data.user.username
        //       }))
        //       // window.location.href = '/';
        //     } else {
        //       setError('Login failed. Please check your credentials');
        //     }
        // } catch (error) {
        //     setError('An error occured while tring to login');
        // }
        // console.log('signin:', showSignupModal, showSigninModal);
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
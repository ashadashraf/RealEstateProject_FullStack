import React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const VideoChat = () => {
    const history = useHistory();
    // const [roomID, setRoomID] = useState();
    // const navigate = useNavigate();
    // const handleJoin = () => {
    //     navigate(`/room/${roomID}`);
    // }
    const { roomID } = useParams();
    let myMeeting = async(element) => {
        const appID = 602805633;
        const serverSecret = "5694d9aec9e2cc2006c87031d717f8c4";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), "Rykerz");
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
              {
                name: 'Copy link',
                url: `https://rykerzrealestates.netlify.app/room/${roomID}`
                // url: `http://localhost:5173/room/${roomID}`
              },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
            showScreenSharingButton: false,
            onLeaveRoom: () => history.push('/userpropertydetail'),
        });
    }

    return (
      <div className="VideoChat" ref={myMeeting}></div>
    )
}

export default VideoChat
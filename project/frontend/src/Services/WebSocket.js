import config from '../Redux/config/config';

class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect(data) {
    console.log('connect data', data);
    
    const path = `${config.API_PATH}?current_user=${data.currentUser}&property_id=${data.propertyId}&property_user=${data.propertyUser}`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log('WebSocket open');
    };
    this.socketRef.onmessage = e => {
      // console.log('onmessage', e.data)
      this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = e => {
      console.log(e.error.message);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed let's reopen");
      this.connect(data);
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === 'messages') {
      this.callbacks[command](parsedData.messages);
    }
    if (command === 'new_message') {
      this.callbacks[command](parsedData.message);
    }
    if (command === 'all_client_messages') {
      this.callbacks[command](parsedData.message);
    }
  }

  initChatUser(username) {
    this.sendMessage({ command: 'init_chat', user_id: username });
  }

  fetchMessages(data) {
    console.log(data);
    this.sendMessage({ command: 'fetch_messages', current_user: data.currentUser, receiver_id: data.propertyUser, property_id: data.propertyId });
  }

  fetchAllClients(data) {
    this.sendMessage({ command: 'fetch_all_clients', current_user: data.currentUser, receiver_id: data.propertyUser, property_id: data.propertyId  });
  }

  newChatMessage(message) {
    this.sendMessage({ command: 'new_message', from: message.from, to: message.to, text: message.text, property: message.property }); 
  }

  addCallbacks(messagesCallback, newMessageCallback, allClientCallback) {
    this.callbacks['messages'] = messagesCallback;
    this.callbacks['new_message'] = newMessageCallback;
    this.callbacks['all_client_messages'] = allClientCallback;
  }
  
  sendMessage(data) {
    try {
      if (this.socketRef && this.socketRef.readyState === 1) {
        console.log('sending', data);
        this.socketRef.send(JSON.stringify({ ...data }));
      } else {
        console.log('WebSocket connection not established.');
      }
    } catch(err) {
      console.log('not sent');
      console.log(err.message);
    }  
  }

  disconnect() {
    if (this.socketRef) {
      this.socketRef.close();
    }
  }

  isConnected() {
    return this.socketRef && this.socketRef.readyState === 1;
  }

  state() {
    return this.socketRef.readyState;
  }

  waitForSocketConnection(callback){
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(
      function () {
        if (socket.readyState === 1) {
          console.log("Connection is made")
          if(callback != null){
            callback();
          }
          return;

        } else {
          console.log("wait for connection...")
          recursion(callback);
        }
      }, 1); // wait 5 milisecond for the connection...
  }

}

const webSocketInstance = WebSocketService.getInstance();

export default webSocketInstance;
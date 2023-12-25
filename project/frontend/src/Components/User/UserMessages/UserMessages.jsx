import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaVideo } from "react-icons/fa";
import './UserMessages.css';
import UserSideLogin from '../../../Pages/UserSide/UserSideLogin';
import { connect } from 'react-redux';
import WebSocketInstance from '../../../Services/WebSocket';
import { withRouter } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      allClients: [],
      subAllClients: [],
      selectedClientData: [],
      isSmallScreen: window.innerWidth <= 767,
      isTooltipVisible: false,
      schedulePrivateTour: false,
      date: new Date().toISOString().slice(0, 16),
      searchContent: '',
      searchFoundContent: null,
    };
    this.messagesEnd = React.createRef();
  }

  componentDidMount() {
    if (this.props.isLoggedin && !WebSocketInstance.isConnected()) {
      const data = {
        propertyId: this.props.propertyId ? this.props.propertyId : 'all',
        propertyUser: this.props.propertyUser ? this.props.propertyUser : 'all',
        currentUser: this.props.currentUser,
      }
      WebSocketInstance.connect(data);
      this.waitForSocketConnection(() => {
        console.log('Entered for connect');
        WebSocketInstance.initChatUser(this.props.currentUser);
        WebSocketInstance.addCallbacks(this.setMessages, this.addMessage, this.setAllClients);
        WebSocketInstance.fetchAllClients(data);
        WebSocketInstance.fetchMessages(data);
      });
    }
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    this.scrollToBottom();
    // this.updateHistory();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    this.setState({
      selectedClientData: '',
      searchContent: '',
    })
    window.removeEventListener('resize', this.handleResize);
    WebSocketInstance.disconnect();
    console.log('exit', this.state.allClients);
  }

  handleResize = () => {
    this.setState({
      isSmallScreen: window.innerWidth <= 767,
    });
  };

  toggleTooltip = () => {
    this.setState((prevState) => ({
      isTooltipVisible: !prevState.isTooltipVisible,
    }))
  }

  showSchedulePrivateTour = () => {
    this.setState((prevState) => ({
      schedulePrivateTour: !prevState.schedulePrivateTour,
    }))
  }

  setDate = (e) => {
    this.setState({date: e.target.value});
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(() => {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
      } else {
        console.log("Wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  scrollToBottom = () => {
    if (this.messagesEnd.current) {
      const chat = this.messagesEnd.current;
      const scrollHeight = chat.scrollHeight;
      const height = chat.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  addMessage = (message) => {
    this.setState(prevState => ({
      messages: [...prevState.messages, message]
    }));
  };

  setMessages = (messages) => {
    this.setState({
      messages: messages.reverse()
    }, () => {
      console.log(this.state.messages);
    });
  };

  setMessage = (message, callback) => {
    console.log(message);
    this.setState({ message }, callback);
  };

  setAllClients = (clients) => {
    console.log(clients)
    const clientArray = Array.isArray(clients) ? clients : [clients];
    this.setState(() => ({
      allClients: [...clientArray],
      subAllClients: [...clientArray],
    }), () => {
      console.log('Upload allClients:', this.state.allClients);
      this.componentDidUpdate();
    });
  };

  setSelectedClientData = (data) => {
    this.setState({
      selectedClientData: [data],
    }, () => {
      console.log(this.state.selectedClientData);
      console.log(this.state.selectedClientData[0].property_owner_id, this.props.currentUser);
    });
  };

  setSubAllClients = (data, callback) => {
    this.setState({
      subAllClients: data
    }, callback);
  };
  
  messageChangeHandler = (event) => {
    this.setState({
      message: event.target.value
    });
  };

  searchContentChangeHandler = (event) => {
    this.setState({
      searchContent: event.target.value
    });
  };

  sendMessageHandler = () => {
    // e.preventDefault();
    const messageObject = {
      from: this.props.currentUser,
      to: this.state.selectedClientData[0] ?. author__id,
      text: this.state.message,
      property: this.state.selectedClientData[0] ?. property__id
    };
    if (messageObject.text !== '') {
      WebSocketInstance.newChatMessage(messageObject);
      this.setState({
        message: ''
      });
    }
    this.componentDidUpdate();
  };

  updateHistory = (messageId) => {
    const newPath = `/room/${messageId}`;
    this.props.history.push(newPath);
  };

  handleIndividualChat = (client) => {
    console.log('component update');
    console.log(23223, client);
    const data = {
      propertyId: client.property__id,
      propertyUser: client.author__id,
      currentUser: this.props.currentUser
    }
    WebSocketInstance.fetchMessages(data);
    this.setSelectedClientData(client);
    this.componentDidUpdate();
  }

  handleSchedulePrivateTour = () => {
    const currentDate = new Date(this.state.date);
    const expirationDate = new Date(currentDate.getTime() + 3 * 60 * 60 * 1000);

    // Format current date and expiration date to IST
    const formattedCurrentDate = currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const formattedExpirationDate = expirationDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    const message = `schedule ${formattedCurrentDate} expire ${formattedExpirationDate}`;
    
    console.log('schedule', message);
    this.setMessage(message, () => {
      if (this.state.date) {
        console.log(this.state.message);
  
        const messageObject = {
          from: this.props.currentUser,
          to: this.state.selectedClientData[0]?.author__id,
          text: this.state.message,
          property: this.state.selectedClientData[0]?.property__id
        };
  
        console.log(messageObject);
      this.sendMessageHandler();
      this.showSchedulePrivateTour();
      }
    });
    this.componentDidUpdate();
  };

  handleSearchSubmit = (event) => {
    event.preventDefault();
    let foundContent = null;
  
    for (let x = 0; x < this.state.allClients.length; x++) {
      if (this.state.searchContent && this.state.allClients[x].author__username.startsWith(this.state.searchContent)) {
        foundContent = this.state.allClients[x];
        break;
      }
    }
  
    foundContent 
    ?
    this.setSubAllClients([foundContent], () => {
      console.log(this.state.subAllClients);
    })
    :
    this.setSubAllClients(this.state.allClients, () => {
      console.log(this.state.subAllClients);
    });
  };
  

  isMessageExpired = (content) => {
    const match = /^schedule (\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM)) expire (\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM))$/i.exec(content);
    if (match) {
      const expireTimeString = match[3];
      const expireTime = new Date(expireTimeString);

      const currentTime = new Date();
      const currentTimeIST = currentTime.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

      console.log(currentTimeIST, expireTimeString, expireTime);

      return currentTimeIST > expireTimeString;
    }
    
    return false;
  };
  

  renderMessages = () => {
    return this.state.messages.map((message) => (
      <li key={message.id} className={message.author === this.props.currentUser ? 'me' : 'him'}>
        <h4 className='author'>{message.author}</h4>
        <p>{message.content}</p>
      </li>
    ));
  };

  render() {
    const currentUser = this.props.currentUser;
    const { isSmallScreen } = this.state;

    return (
      <React.Fragment>
        {this.state.allClients && this.state.allClients !== "No registered user" 
        ?
        <Row>
          <Col md={4} style={{height: '100%'}}>
            <form onSubmit={(event) => this.handleSearchSubmit(event)}>
              <div className="flex">
                <div className="relative w-full">
                  <input onChange={(event) => this.searchContentChangeHandler(event)} value={this.state.searchContent} type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search by property name" required></input>
                  <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                      <span className="sr-only">Search</span>
                  </button>
                </div>
              </div>
            </form>
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {this.state.subAllClients && this.state.subAllClients.map((client, index) => (
              <li key={index} className="py-3 sm:py-4 mt-2 client-message-list" onClick={() => this.handleIndividualChat(client)}>
                <div className="flex items-center space-x-4 rtl:space-x-reverse p-2">
                  <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D" alt="Profile Image" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm d-flex justify-start font-medium overflow-hidden whitespace-nowrap text-overflow-ellipsis" style={{textTransform: 'capitalize'}}>
                      <b>{client?.author__username}</b>
                    </p>
                    <p className="text-md d-flex justify-start overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                      Property: {client?.property__property_name}
                    </p>
                  </div>
                  <div className="inline-flex items-center">
                    <img className="w-8 h-8" src={client?.property_image} alt="Property Image" />
                  </div>
                </div>
              </li>
            ))}

              {/* {this.state.allClients.map((client, index) => 
                {client[index] && (
                  <li key={index} className="py-3 sm:py-4 mt-2 client-message-list" onClick={() => this.handleIndividualChat(client[index].author__id, client[index].property__id)}>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse p-2">
                      <div className="flex-shrink-0">
                          <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D" alt="Profile Image" />
                      </div>
                      <div class="flex-1 min-w-0">
                          <p className="text-sm d-flex justify-start font-medium overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                            <b>{client[index].author__username}</b>
                          </p>
                          <p className="text-md d-flex justify-start overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                            Property: {client[index].property__property_name}
                          </p>
                      </div>
                      <div className="inline-flex items-center">
                        <img className="w-8 h-8" src={client[index].property_image} alt="Property Image" />
                      </div>
                    </div>
                  </li>
                )}
              )} */}
            </ul>
          </Col>
          <Col md={8}>
            <div style={{borderLeftWidth: '3px', borderLeftColor: 'rgb(254 226 226)', paddingLeft: '13px'}}>
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
                <a className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"></img>
                </a>
                <p className='text-lg text-white' style={{textTransform: 'capitalize'}}>{this.state.selectedClientData[0] ?. author__username}</p>
                <div>
                {/* <button type="button" onClick={this.updateHistory} className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video mr-2" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/>
                  </svg>
                    Request a private tour
                </button> */}
                {this.state.selectedClientData[0] && this.props.currentUser !== this.state.selectedClientData[0].property_owner_id && (
                <button type="button" onClick={this.showSchedulePrivateTour} data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video mr-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/>
                  </svg>
                    Request a private tour
                </button>
                )}
                {this.state.schedulePrivateTour && (
                <div id="popup-modal" tabIndex="-1" className="flex visible overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-end items-center w-full md:inset-0 h-[calc(75%-1rem)] max-h-full">
                    <div className="relative p-4 w-3/4 max-w-md max-h-full">
                        <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
                            <button type="button" onClick={this.showSchedulePrivateTour} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                              <div className='flex justify-center mb-3'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-calendar-check" viewBox="0 0 16 16">
                                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                              </svg>
                              </div>
                              <h3 className='mb-2 text-center text-lg font-normal text-white'>Schedule Your Private Tour with {this.state.selectedClientData[0].property__property_name}</h3>
                              <input className='mb-3' onChange={(e) => this.setDate(e)} value={this.state.date} type="datetime-local" min={new Date().toISOString().slice(0, 16)} />
                              <br /><small className='text-sm text-gray-700'>The link will expire in 2 hours</small>
                              <h3 className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">Are you sure you want to sent the request?</h3>
                              <button onClick={this.handleSchedulePrivateTour} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center me-2">
                                  Yes, I'm sure
                              </button>
                              <button onClick={this.showSchedulePrivateTour} data-modal-hide="popup-modal" type="button" className="text-black bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-3 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                )}
                </div>
              </div>
              <div className='mt-3 mb-5'>
                {this.state.selectedClientData && this.state.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-${
                      message.author !== this.props.username ? 'start' : 'end'
                    } mb-2`}
                  >
                    {message.author !== this.props.username && (
                      <a href='#'>
                        <img
                          className='w-8 h-8 rounded-full'
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                          alt='Sender Image'
                        />
                      </a>
                    )}
                    <div className={`${message.author !== this.props.username ? 'pl' : 'pr'}-1`}>
                      <div
                        className={`text-${
                          message.author !== this.props.username ? 'left' : 'right'
                        } p-2 ${
                          message.author === this.props.username ? 'bg-green-100' : 'bg-red-100'
                        }`}
                        style={{borderRadius: '10px', maxWidth: '28vw'}}
                      >
                        {/^schedule (\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM)) expire (\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM))$/i.test(message.content) ? (
                          <div className={`max-w-sm pl-6 pr-6 pt-3 pb-3 bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${this.isMessageExpired(message.content) ? 'cursor-not-allowed opacity-80' : ''}`}>
                            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Request for Private home tour</h5>
                            <div className='flex justify-between'>
                              <p className={`mb-3 font-normal text-gray-700 dark:text-white ${
                                this.state.selectedClientData[0]?.property__property_name.length > 6 ? 'truncate' : ''
                              }`}>
                                Property: {this.state.selectedClientData[0]?.property__property_name}
                              </p>
                              <p className="mb-3 font-normal text-gray-700 dark:text-green-500">Issued: {RegExp.$1}</p>
                            </div>
                            <div className='flex justify-between'>
                              <p className="mb-3 font-normal text-gray-700 dark:text-white">{this.state.selectedClientData[0]?.author__username} - {this.props.username}</p>
                              <p className="mb-3 font-normal text-gray-700 dark:text-red-500">Expire: {RegExp.$3}</p>
                            </div>
                            {!this.isMessageExpired(message.content) && (
                              <a onClick={() => this.updateHistory(message.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                                Connect
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                              </a>
                            )}
                          </div>
                        ) : (
                          message.content
                        )}
                      </div>
                    </div>
                    {message.author === this.props.username && (
                      <a href='#'>
                        <img
                          className='w-8 h-8 rounded-full'
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="sender image"
                        />
                      </a>
                    )}
                  </div>
                  ))}
                </div>
              <div className={`fixed z-50 ml-9 w-full sm:w-1/2 h-12 max-w-sm -translate-x-2/2 bg-white border-4 border-gray-200 rounded-full bottom-4 left-2/2 dark:bg-gray-700 dark:border-gray-600`}>
                <div className="d-flex h-full max-w-lg justify-between mx-auto">
                  <div className="flex items-center justify-center">
                    <button data-tooltip-target="tooltip-new" type="button" onClick={this.toggleTooltip} className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-900 rounded-full hover:bg-blue-950 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                      <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                      </svg>
                      <span className="sr-only">New item</span>
                    </button>
                  </div>
                  {this.state.isTooltipVisible && (
                  <div id="tooltip-new" role="tooltip" className="m-5 absolute z-10 visible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-100 tooltip dark:bg-gray-700"
                    style={{ top: "-100%", transform: "translateY(-100%)" }}>
                    <div className="w-48 text-gray-900 bg-black border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                            Profile
                        </button>
                        <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"/>
                            </svg>
                            Settings
                        </button>
                        <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                                <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor"/>
                                <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor"/>
                            </svg>
                            Messages
                        </button>
                        <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                                <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                            </svg>
                            Download
                        </button>
                    </div>
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  )}
                  <div className='w-100'>
                    <input className='w-100 pl-5 h-10' value={this.state.message} onChange={this.messageChangeHandler} type="text" placeholder='Type here...' />
                  </div>
                  <div className="flex items-center justify-center">
                    <button onClick={this.sendMessageHandler} data-tooltip-target="tooltip-sent-message" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-900 rounded-full hover:bg-blue-950 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-arrow-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                    </svg>
                      <span className="sr-only">Sent Message</span>
                    </button>
                  </div>
                  <div id="tooltip-sent-message" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Sent message
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>
              </div>  
            </div>
          </Col>
        </Row>
        : <UserSideLogin />
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.showIsLoggedin.userId,
  username: state.showIsLoggedin.username,
  isLoggedin: state.showIsLoggedin.value,
});

export default withRouter(connect(mapStateToProps)(Chat));



























// import React, {useEffect, useState} from 'react'
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { FaVideo } from "react-icons/fa";
// import { useSelector } from 'react-redux';
// import WebSocketInstance from '../../../Redux/webSocket/websocketService';

// const UserMessages = () => {
//   const userId = useSelector((state) => state.showIsLoggedin.userId);
//   const [textMessage, setTextMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   // const addMessage = (message) => {
//   //   setMessages((prevMessages) => [...prevMessages, message]);
//   // };

//   // const setAllMessages = (messages) => {
//   //   setMessages(messages.reverse());
//   // };

//   useEffect(() => {
//     const waitForSocketConnection = (callback) => {
//       setTimeout(function () {
//         console.log(WebSocketInstance.state());
//         if (WebSocketInstance.state() === 1) {
//           console.log('Connection is made');
//           callback();
//           return;
//         } else {
//           console.log('Wait for connection...');
//           waitForSocketConnection(callback);
//         }
//       }, 100);
//     };

//     WebSocketInstance.connect(userId)

//     waitForSocketConnection(() => {
//       WebSocketInstance.initChatUser(userId);
//       WebSocketInstance.addCallbacks(setAllMessages, addMessage);
//       WebSocketInstance.fetchMessages(userId);
//     });

//     return () => {
//       WebSocketInstance.disconnect();
//     }
//   }, [userId]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     console.log('sent message 1',textMessage, userId);
//     const messageObject = {
//       from: userId,
//       text: textMessage,
//     };
//     WebSocketInstance.newChatMessage(messageObject);
//     setTextMessage('');
//   };

//   return (
//     <React.Fragment>
//       <Row>
//         <Col md={4} style={{height: '100%'}}>
//           <form>
//             <div className="flex">
//               <div className="relative w-full">
//                   <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search by property name" required></input>
//                   <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                       <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                       </svg>
//                       <span className="sr-only">Search</span>
//                   </button>
//               </div>
//             </div>
//           </form>               
//           <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
//             <li className="pb-3 sm:pb-4">
//                 <div className="flex items-center space-x-4 rtl:space-x-reverse">
//                   <div className="flex-shrink-0">
//                       <img className="w-8 h-8 mt-3 rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D" alt="Neil image"></img>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                       <p className="text-left mt-2 text-sm font-medium text-black truncate dark:text-white">
//                         Neil Sims
//                       </p>
//                   </div>
//                 </div>
//             </li>
//             <li className="py-3 sm:py-4">
//                 <div className="flex items-center space-x-4 rtl:space-x-reverse">
//                   <div className="flex-shrink-0">
//                       <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Neil image"></img>
//                   </div>
//                   <div class="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                         Bonnie Green
//                       </p>
//                       <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                         email@flowbite.com
//                       </p>
//                   </div>
//                   <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
//                       $3467
//                   </div>
//                 </div>
//             </li>
//           </ul>
//         </Col>
//         <Col md={8}>
//           <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
//             <a className="flex items-center space-x-3 rtl:space-x-reverse">
//                 <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"></img>
//             </a>
//             <p className='text-lg'>Tony Ferguson</p>
//             <FaVideo className='p-1' size={'2.5vw'} />
//           </div>
//           <div className='mt-3'>
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex items-center justify-${
//                   message.from === userId ? 'start' : 'end'
//                 } mb-2`}
//               >
//                 {message.from !== userId && (
//                   <a href='#'>
//                     <img
//                       className='w-10 h-10 rounded-full'
//                       src={message.fromAvatar}
//                       alt={message.from}
//                     />
//                   </a>
//                 )}
//                 <div className={`${message.from === userId ? 'pl' : 'pr'}-1`}>
//                   <p
//                     className={`text-${
//                       message.from === userId ? 'left' : 'right'
//                     } p-2 ${
//                       message.from === userId ? 'bg-green-100' : 'bg-red-100'
//                     }`}
//                   >
//                     {message.text}
//                   </p>
//                 </div>
//                 {message.from === userId && (
//                   <a href='#'>
//                     <img
//                       className='w-10 h-10 rounded-full'
//                       src={message.fromAvatar}
//                       alt={message.from}
//                     />
//                   </a>
//                 )}
//               </div>
//             ))}
//             {/* <div class="flex items-center justify-start mb-2">
//               <a href="#">
//                   <img class="w-10 h-10 rounded-full" src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D' alt="Jese Leos"></img>
//               </a>
//               <div className='pl-1'>
//               <p className='text-left p-2 bg-green-100'>message goes here</p>
//               </div>
//             </div>
//             <div class="flex items-center justify-end mb-2">
//               <div className='pr-1'>
//               <p className='text-right p-2 bg-red-100'>message goes here</p>
//               </div>
//               <a href="#">
//                 <img class="w-10 h-10 rounded-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU' alt="Jese Leos"></img>
//               </a>
//             </div> */}
//           </div>
//           <div className="fixed z-50 w-full h-12 max-w-sm -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-2/2 dark:bg-gray-700 dark:border-gray-600">
//             <div className="d-flex h-full max-w-lg justify-between mx-auto">
//                 <div className="flex items-center justify-center">
//                     <button data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-900 rounded-full hover:bg-blue-950 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
//                         <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
//                         </svg>
//                         <span className="sr-only">New item</span>
//                     </button>
//                 </div>
//                 <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
//                     {/* Create new item */}
//                     <div className="w-48 text-gray-900 bg-black border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
//                         <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
//                             <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                                 <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
//                             </svg>
//                             Profile
//                         </button>
//                         <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
//                             <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"/>
//                             </svg>
//                             Settings
//                         </button>
//                         <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
//                             <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
//                                 <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor"/>
//                                 <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor"/>
//                             </svg>
//                             Messages
//                         </button>
//                         <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
//                             <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                                 <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
//                                 <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
//                             </svg>
//                             Download
//                         </button>
//                     </div>
//                     <div className="tooltip-arrow" data-popper-arrow></div>
//                 </div>
//                 <div className='w-100'>
//                   <input className='w-100 pl-5 h-11' value={textMessage} onChange={(e) => setTextMessage(e.target.value)} type="text" placeholder='Type here...' />
//                 </div>
//                 <div className="flex items-center justify-center">
//                     <button onClick={handleSendMessage} data-tooltip-target="tooltip-sent-message" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-900 rounded-full hover:bg-blue-950 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-arrow-right" viewBox="0 0 16 16">
//                       <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
//                     </svg>
//                         <span className="sr-only">Sent Message</span>
//                     </button>
//                 </div>
//                 <div id="tooltip-sent-message" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
//                     Sent message
//                     <div className="tooltip-arrow" data-popper-arrow></div>
//                 </div>
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </React.Fragment>
//   )
// }

// export default UserMessages
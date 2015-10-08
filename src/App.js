import React, { Component, findDOMNode } from 'react';
import $ from 'jquery';

class Greeter extends Component {
  render() {
    return (
        <h2>Hi, {this.props.name}!</h2>
    )
  }
}


class ChatList extends Component {
  render() {
    var chatNodes = this.props.message.map(
      message => <div>{message}</div>
    );
    return (
      <div className="ChatList">
        {chatNodes}
      </div>
    )
  }
}

class ChatForm extends Component {
  handleSubmit(e){
    e.preventDefault();
    let chatMessage = findDOMNode(this.refs.chatMessage);

    this.props.onChatSubmit(chatMessage.value.trim());
    chatMessage.value = '';
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="Your Message" ref="chatMessage" />
        <input type="submit" value="Go" onClick={this.handleSubmit.bind(this)} />
      </form>
    )
  }
}


export class App extends Component {
  constructor() {
    super();
    this.state = { message: [] };
  }

  loadMessagesFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: (data) => {
        this.setState({message: data.message});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  componentDidMount(){
    this.loadMessagesFromServer();
    //setInterval(this.loadMessagesFromServer.bind(this), this.props.pollInterval);
  }

  handleChatSubmit(message){
    var messages = this.state.message;
    var newMessages = messages.concat([message]);
    this.setState({message: newMessages});

    /*$.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: message,
      success: (data) => {
        this.setState({message: newMessages});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    })*/
  }

  render() {
    return (
      <div>
        <Greeter name="Rich"></Greeter>
        <ChatList message={this.state.message} />
        <ChatForm onChatSubmit={this.handleChatSubmit.bind(this)}/>
      </div>
    );
  }
}


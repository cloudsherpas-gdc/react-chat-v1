import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './colors';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h1 style={{ color: this.props.color }}>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    );
  }
}

export class App extends Component {
  render() {
    return (
      <div>
        <Counter increment={1} color={NICE} />
        <Counter increment={5} color={SUPER_NICE} />
      </div>
    );
  }
}

class ChatList extends Component {
  render() {
    var chatNodes = this.props.data.map(
      (message) => {
        return (
          <Message author={message.author}>
            {message.text}
          </Message>
        )
      });
    return (
      <div className="ChatList">
        {chatNodes}
      </div>
    )
}

class ChatForm extends Component {
  handleSubmit(e){
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author){
      return;
    }
    this.props.onChatSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  }

  render(){
    return (
      <form className="chatForm" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Your comment" ref="text" />
        <input type="submit" value="Post" />
      </form>
    )
  }
}

class ChatBox extends Component {
  constructor() {
    this.state = { data: [] }
  }

  loadMessagesFromServer() {
    this.setState({data: data});
  }

  handleChatSubmit(message){
    var messages = this.state.data;
    var newMessages = comments.concat([message]);
    this.setState({data: newMessages});
  }

  componentDidMount() {
    this.loadMessagesFromServer();
    setInterval(this.loadMessagesFromServer.bind(this), this.props.pollInterval);
  }

  render() {
    return <div className="chatBox">
    <h1>Comments
    <ChatList data={this.state.data} />
    <ChatForm onChatSubmit={this.handleChattSubmit.bind(this)}/>
    </div>
  }
}

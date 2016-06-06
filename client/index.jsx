import React from 'react';
import ReactDOM from 'react-dom';
// import {createStore, applyMiddleware} from 'redux';
// import {Provider} from 'react-redux';
import io from 'socket.io-client';
//import reducer from './reducer';
// import {setClientId, setState, setConnectionState} from './action_creators';
// import remoteActionMiddleware from './remote_action_middleware';
//import getClientId from './client_id';
// import App from './components/App';

// require('./style.css');



// const socket = io(`${location.protocol}//${location.hostname}:8090`);
const socket = io('http://localhost:8090')
socket.on('state', state =>
  console.log('state', state)
 // store.dispatch(setState(state))
);
[
  'connect',
  'connect_error',
  'connect_timeout',
  'reconnect',
  'reconnecting',
  'reconnect_error',
  'reconnect_failed'
].forEach(ev =>
  socket.on(ev, () => console.log('ev', ev))//store.dispatch(setConnectionState(ev, socket.connected)))
);
socket.emit('action', {type: 'CHANGEFEELING', user: 'nathan', feeling: 'Flow'})
// const createStoreWithMiddleware = applyMiddleware(
//   remoteActionMiddleware(socket)
// )(createStore);
// const store = createStoreWithMiddleware(reducer);
// store.dispatch(setClientId(getClientId()));


var ClassPoller = React.createClass({
  render: function(){
    return (
      <div>
         <Report/>
         <Buttons/>
      </div>)
  }
})

var Buttons = React.createClass({
  render : function(){
    return (<div>
        <LearningStatus feeling="Panic" buttonClass="btn-danger"/>
        <LearningStatus feeling="Arousal" buttonClass='btn-warning'/>
        <LearningStatus feeling="Flow" buttonClass='btn-success'/>
        <LearningStatus feeling="Boredom" buttonClass='btn-primary'/>
      </div>
           )
  }
})

var Report = React.createClass({
  render : function(){
    return (<div>
      <h1 style={{color: "red"}}>Panic: 0</h1><br/>
      <h1 style={{color: "orange"}}>Arousal: 0</h1><br/>
      <h1 style={{color: "green"}}>Flow: 0</h1><br/>
      <h1 style={{olor: "blue"}}>Boredom: 0</h1><br/>
      </div>)
  }
})

var LearningStatus = React.createClass({
  isSelected(){
    return this.props.feeling === 'Flow' ? ' btn-lg' : ''
  },
  render : function(){
    return (<div className={'btn ' + this.props.buttonClass + ' ' + this.isSelected()}>{this.props.feeling}</div>)
  }
})


//console.log(document.getElementById('app'))
//React.render((<ClassPoller/>), document.getElementById('app'));





ReactDOM.render(
  (<ClassPoller/>),
  document.getElementById('app')
);
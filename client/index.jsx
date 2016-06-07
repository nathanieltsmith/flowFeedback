import React from 'react';
import ReactDOM from 'react-dom';
// import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import _ from 'lodash'
//import reducer from './reducer';
// import {setClientId, setState, setConnectionState} from './action_creators';
// import remoteActionMiddleware from './remote_action_middleware';
import getClientId from './client_id';
// import App from './components/App';

// require('./style.css');



// const socket = io(`${location.protocol}//${location.hostname}:8090`);
const socket = io('http://localhost:8090')

// [
//   'connect',
//   'connect_error',
//   'connect_timeout',
//   'reconnect',
//   'reconnecting',
//   'reconnect_error',
//   'reconnect_failed'
// ].forEach(ev =>
//   socket.on(ev, () => console.log('ev', ev))//store.dispatch(setConnectionState(ev, socket.connected)))
// );
socket.emit('action', {type: 'CHANGEFEELING', user: getClientId(), feeling: 'Flow'})
// const createStoreWithMiddleware = applyMiddleware(
//   remoteActionMiddleware(socket)
// )(createStore);
// const store = createStoreWithMiddleware(reducer);
// store.dispatch(setClientId(getClientId()));


var ClassPoller = React.createClass({
  componentWillMount: function(){
    var self = this
    socket.on('state', function(serverState){
      console.log('serverState', serverState)
      self.setState({serverState: serverState})
    });
  },
  render: function(){
    return (
      <div>
         <Report  serverState={this.state.serverState}/>
         <Buttons serverState={this.state.serverState}/>
      </div>)
  }
})

var Buttons = React.createClass({
  render : function(){
    return (<div>
        <LearningStatus serverState={this.props.serverState} feeling="Panic" buttonClass="btn-danger"/>
        <LearningStatus serverState={this.props.serverState} feeling="Arousal" buttonClass='btn-warning'/>
        <LearningStatus serverState={this.props.serverState} feeling="Flow" buttonClass='btn-success'/>
        <LearningStatus serverState={this.props.serverState} feeling="Boredom" buttonClass='btn-primary'/>
      </div>
           )
  }
})

var Report = React.createClass({
  render : function(){
    return (<div>
      <ReportType feeling="Panic" color="red" serverState={this.state.serverState}/>
      <ReportType feeling="Arousal" color="orange" serverState={this.state.serverState}/>
      <ReportType feeling="Flow" color="green" serverState={this.state.serverState}/>
      <ReportType feeling="Boredom" color="blue" serverState={this.state.serverState}/>
      </div>)
  }
})

var ReportType = React.createClass({
  computeTotal: function() {
   return _.values(this.props.serverState).filter(x => x === this.props.feeling).length
  },
  render: function(){
    return (<p><h1 style={{color: this.props.color}}>{this.props.feeling}: {this.computeTotal()}</h1></p>)
  }
})

var LearningStatus = React.createClass({
  isSelected: function(){
 return this.props.feeling === this.props.serverState[getClientId()] ? ' btn-lg' : ''
  },
  render : function(){
    return (<div className={'btn ' + this.props.buttonClass + ' ' + this.isSelected()}>{this.props.feeling}</div>)
  }
})






ReactDOM.render(
  (<ClassPoller/>),
  document.getElementById('app')
);
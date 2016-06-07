import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import _ from 'lodash'
import getClientId from './client_id';

const socket = io('https://young-sierra-33180.herokuapp.com/:8090')

socket.emit('action', {type: 'CHANGEFEELING', user: getClientId(), feeling: 'Flow'})

var ClassPoller = React.createClass({
  getInitialState: function() {
    return {}
  },
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
         <Report serverState={this.state.serverState}/>
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
      <ReportType feeling="Panic" color="red" serverState={this.props.serverState}/>
      <ReportType feeling="Arousal" color="orange" serverState={this.props.serverState}/>
      <ReportType feeling="Flow" color="green" serverState={this.props.serverState}/>
      <ReportType feeling="Boredom" color="blue" serverState={this.props.serverState}/>
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
    return this.props.serverState && (this.props.feeling === this.props.serverState[getClientId()]) ? ' btn-lg' : ''
  },
  onClick: function(){
    socket.emit('action', {type: 'CHANGEFEELING', user: getClientId(), feeling: this.props.feeling})
  },
  render : function(){
    return (<div onClick={this.onClick} className={'btn ' + this.props.buttonClass + ' ' + this.isSelected()}>{this.props.feeling}</div>)
  }
})

ReactDOM.render(
  (<ClassPoller/>),
  document.getElementById('app')
);
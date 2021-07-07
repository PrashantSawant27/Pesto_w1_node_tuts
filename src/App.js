import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import ReactDOM from 'react-dom';
import { Card,Button,Row, Col } from 'react-bootstrap';
import Reminder from './components/reminder.js';
import  {getReminders,setReminders} from './StorageHelper';
// import TimePicker from 'react-gradient-timepicker'; // or
// var TimePicker = require('react-gradient-timepicker');

// import Timekeeper from 'react-timekeeper';

export class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={ reminders:[],title:"",dateTime:""};
    this.addReminder=this.addReminder.bind(this);
    this.onChange=this.onChange.bind(this);

  }
  componentDidMount(){
    document.title = "Reminder App";
    this.setRemindersFromStorage();
  }

  setRemindersFromStorage(){
    this.setState({reminders:getReminders()});
    // const upcoming =reminders.filter(ele =>{ return ele.dateTime>=new Date()});
    // this.setState({upcoming: upcoming});
    // const completed=reminders.filter(ele =>{ return ele.dateTime<=new Date()});
    // this.setState({completed: completed});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <p>I'll Remind you everything on time</p>
        </header>
        <Card>
          <Card.Body>
          <Row>
          <Col>
            <input className="form-control" ref={title => {this.setState({title: title.value}) }} placeholder="What do you want to remember"></input>
          </Col>
          <Col>
          <input className="form-control" ref={dateTime => {this.setState({dateTime: dateTime.value})}} placeholder="Time in hh:mm:ss"></input>
          
          </Col>
          <Col md="auto">
            <Button onClick={this.addReminder}>Remind me</Button>
          </Col>
          </Row>
          </Card.Body>
        </Card>
        {this.state.reminders.length===0?
            "No reminders"
            :
            this.state.reminders.map((item)=>{
              return (
                <Reminder key={item.id} title={item.title} dateTime={item.dateTime}></Reminder>
              )
            })
        }
        
      </div>
    );

    
  }
  onChange(val){
    console.log(val);
    this.setState({dateTime:val.toString()});
  }

  addReminder(){
      const reminder={
                    reminder_id:this.state.reminders.length+1,
                    title:this.state.title!=null?this.state.title.value:"",
                    dateTime:this.state.dateTime!=null?this.state.dateTime.value:""
                  };
      const reminders=this.state.reminders;
      reminders.push(reminder);
      
      this.setState({reminders:reminders});
      setReminders(this.state.reminders);
      // this.state.title.value="";
      // this.state.dateTime.value="";
  }
  
}

export default App;
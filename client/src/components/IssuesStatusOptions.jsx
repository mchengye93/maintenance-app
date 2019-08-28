import React, {Component} from 'react';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



class IssueStatusOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
          status: 0
        };
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }
    componentDidMount() {
  
  

    }
    handleChangeStatus(e) {
        e.preventDefault();
        console.log(e.target.innerText);

        let statusString = e.target.innerText;
        let status = 0;



        if (statusString === 'PENDING') {
          status = 0
        }
        if (statusString === 'IN PROGRESS') {
          status = 1;
        }

        if (statusString === 'RESOLVED') {
          status = 2;
        }

        this.setState({status: status})
        console.log('handle change status executed!');
       this.props.changeIssueStatus(status);
    }

    render() {
        
        // return (
            
              
        //         <span> Status: <select name='status' value ={this.state.value} onChange={this.handleChangeStatus}>
        //           <option value={0}>Pending</option>
        //           <option value={1}>In Progress</option>
        //           <option value={2}>Resolved</option>
        //         </select>
        //         </span>
     
        // );

        return(
          <Paper>
              <Tabs
                value={this.state.status}
                onChange={this.handleChangeStatus}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Pending" value={0}/>
                <Tab label="In Progress" value={1}/>
                <Tab label="Resolved" value={2}/>
              </Tabs>
        </Paper>

        );
    }
}
export default IssueStatusOptions;
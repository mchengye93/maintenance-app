import React, {Component} from 'react';

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
       this.props.changeIssueStatus(status);
    }

    render() {

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
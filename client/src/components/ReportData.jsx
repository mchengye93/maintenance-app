import React, {Component} from 'react';
import axios from 'axios';


class ReportData extends Component {
    constructor(props) {
        super(props);
        this.state = {
          issues: [],
        };
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }
    componentDidMount() {
        axios.get('/api/issues/resolved')
        .then((response)=> {
            this.setState({
                issues: response.data
            })
        })
    }
    handleChangeStatus(e) {
        e.preventDefault();
    
        
    }
    parseIssues(issues) {
        

    }

    render() {
        console.log(this.state);
        return(
            <div id="report">
                Inside report data!
            </div>
        
        );
    }
}

export default ReportData;
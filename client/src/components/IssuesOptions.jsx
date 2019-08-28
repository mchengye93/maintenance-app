import React, {Component} from 'react';
import axios from 'axios';
// import { Button } from '@material-ui/core';




class IssueOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
        this.handleOptions = this.handleOptions.bind(this);
    }
    componentDidMount() {
  
  

    }
    handleOptions(e) {
        e.preventDefault();
        let categoryId = e.target.value;
        this.props.changeOptions(optionId);
    }

    render() {
        
        return (
                
                
           
        );
    }
}
export default IssueOptions;
import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import TakeIssueForm from './TakeIssueForm.jsx';
import SolveForm from './SolveForm.jsx';

class IssueRowData extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount() { 

    }

    render() {
       
        if(this.props.status == 0) {
            return (
                <TableRow key={this.props.issue.id}>
                    <TableCell>{this.props.issue.room_id}</TableCell>
                    <TableCell>{this.props.issue.category}</TableCell>
                    <TableCell>{this.props.issue.subcategory}</TableCell>
                    <TableCell>{this.props.issue.date_issued.split('T')[0]}</TableCell>
                    <TableCell>
                        <TakeIssueForm issue= {this.props.issue}  changeIssueStatus = {this.props.changeIssueStatus}/>
                    </TableCell>
                </TableRow>
                             
            );
        } else if (this.props.status == 1) {
            return (
                <TableRow key={this.props.issue.id}>
                    <TableCell>{this.props.issue.room_id}</TableCell>
                    <TableCell>{this.props.issue.category}</TableCell>
                    <TableCell>{this.props.issue.subcategory}</TableCell>
                    <TableCell>{this.props.issue.date_issued.split('T')[0]}</TableCell>
                    <TableCell>{this.props.issue.date_received.split('T')[0]}</TableCell>
                    <TableCell>{this.props.issue.name}</TableCell>
                    <TableCell>
                        <SolveForm issue= {this.props.issue} changeIssueStatus = {this.props.changeIssueStatus}/>
                    </TableCell>
                </TableRow>
                             
            );
        } else if (this.props.status == 2) {
            return (
                <TableRow key={this.props.issue.id}>
                    <TableCell>{this.props.issue.room_id}</TableCell>
                    <TableCell>{this.props.issue.category}</TableCell>
                    <TableCell>{this.props.issue.subcategory}</TableCell>
                    <TableCell>{this.props.issue.date_issued.split('T')[0]}</TableCell>
                    <TableCell>{this.props.issue.date_received.split('T')[0]}</TableCell>
                    <TableCell>{this.props.issue.date_resolved.split('T')[0]}</TableCell>
                    <TableCell>{this.props.issue.name}</TableCell>
                    <TableCell>{this.props.issue.cost}</TableCell>
                </TableRow>                 
            );
        }
    }
}

export default IssueRowData;
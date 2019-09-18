import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import TakeIssueForm from './TakeIssueForm.jsx';
import SolveForm from './SolveForm.jsx';
import UpdateIssueForm from './UpdateIssueForm.jsx';

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
                    <TableCell align='center'>{this.props.issue.room_id}</TableCell>
                    <TableCell align='center'>{this.props.issue.category}</TableCell>
                    <TableCell align='center'>{this.props.issue.subcategory}</TableCell>
                    <TableCell align='center'>{this.props.issue.date_issued.split('T')[0]}</TableCell>
                    <TableCell align='center'>
                        <TakeIssueForm issue= {this.props.issue}  changeIssueStatus = {this.props.changeIssueStatus}/>
                    </TableCell>
                </TableRow>
                             
            );
        } else if (this.props.status == 1) {
            return (
                <TableRow key={this.props.issue.id}>
                    <TableCell align='center'>{this.props.issue.room_id}</TableCell>
                    <TableCell align='center'>{this.props.issue.category}</TableCell>
                    <TableCell align='center'>{this.props.issue.subcategory}</TableCell>
                    <TableCell align='center'>{this.props.issue.date_issued.split('T')[0]}</TableCell>
                    <TableCell align='center'>{this.props.issue.date_received.split('T')[0]}</TableCell>
                    <TableCell align='center'>{this.props.issue.name}</TableCell>
                    <TableCell align='center'>
                        <SolveForm issue= {this.props.issue} changeIssueStatus = {this.props.changeIssueStatus}/>
                        <UpdateIssueForm issue= {this.props.issue} categories={this.props.categories}/>
                    </TableCell>
                </TableRow>
                             
            );
        } else if (this.props.status == 2) {
            return (
                <TableRow key={this.props.issue.id}>
                    <TableCell align='center'>{this.props.issue.room_id}</TableCell>
                    <TableCell align='center'>{this.props.issue.category}</TableCell>
                    <TableCell align='center'>{this.props.issue.subcategory}</TableCell>
                    <TableCell align='center'>{this.props.issue.date_issued.split('T')[0]}</TableCell>
                    <TableCell align='center'>{this.props.issue.date_received.split('T')[0]}</TableCell>
                    <TableCell align='center'>{this.props.issue.date_resolved.split('T')[0]}</TableCell>
                    <TableCell align='center'>{this.props.issue.name}</TableCell>
                    <TableCell align='center'>{this.props.issue.cost}</TableCell>
                </TableRow>                 
            );
        }
    }
}

export default IssueRowData;
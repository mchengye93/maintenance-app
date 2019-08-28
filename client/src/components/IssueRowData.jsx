import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';


class IssueRowData extends Component {
    constructor(props) {
        super(props);

        this.state = {
        
        };

    }
    componentDidMount() {
        

    }

    render() {
        return (
            <TableRow key={this.props.issue.room_id}>
            <TableCell>{this.props.issue.room_id}</TableCell>
            <TableCell>{this.props.issue.category}</TableCell>
            <TableCell>{this.props.issue.subcategory}</TableCell>
            <TableCell>{this.props.issue.date_issued}</TableCell>
            <TableCell><Button>Take Issue</Button></TableCell>
            </TableRow>
                         
        );
    }
}
export default IssueRowData;
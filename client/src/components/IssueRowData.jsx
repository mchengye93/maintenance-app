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
       
        if(this.props.status=== 0) {
            return (
                <TableRow key={this.props.issue.room_id}>
                <TableCell>{this.props.issue.room_id}</TableCell>
                <TableCell>{this.props.issue.category}</TableCell>
                <TableCell>{this.props.issue.subcategory}</TableCell>
                <TableCell>{this.props.issue.date_issued.split('T')[0]}</TableCell>
                <TableCell><Button variant="outlined" >Take Issue</Button></TableCell>
                </TableRow>
                             
            );
        }
        else if (this.props.status === 1) {
            return (
                <TableRow key={this.props.issue.room_id}>
                <TableCell>{this.props.issue.room_id}</TableCell>
                <TableCell>{this.props.issue.category}</TableCell>
                <TableCell>{this.props.issue.subcategory}</TableCell>
                <TableCell>{this.props.issue.date_issued.split('T')[0]}</TableCell>
                <TableCell>{this.props.issue.date_received.split('T')[0]}</TableCell>
                <TableCell>{this.props.issue.name}</TableCell>
                <TableCell><Button variant="outlined" >Solve</Button></TableCell>
                </TableRow>
                             
            );
        }

        else if (this.props.status === 2) {
            return (
                <TableRow key={this.props.issue.room_id}>
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
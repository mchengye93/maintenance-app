import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IssueRowData from './IssueRowData.jsx';

class InProgressTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }
    componentDidMount() {

    }

    render() {
       
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={7} align='center' variant='head' style={{backgroundColor:'#bda800', color: 'white' ,fontSize:'14px'}}>
                            In Progress
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell>Room ID</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>SubCategory</TableCell>
                            <TableCell>Issued Date</TableCell>
                            <TableCell>Received Date</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.issues.map(issue => (
                            <IssueRowData issue = {issue} status={1} changeIssueStatus = {this.props.changeIssueStatus}/>
                        ))}
                    </TableBody>
                </Table>
            );
        } 
}

export default InProgressTable;
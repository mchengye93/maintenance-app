import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Button from '@material-ui/core/Button';

import IssueRowData from './IssueRowData.jsx';


class ResolvedTable extends Component {
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
                        <TableCell colSpan={8} align='center' variant='head' style={{backgroundColor:'#006600', color: 'white' ,fontSize:'14px'}}>
                        RESOLVED
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
                        <TableCell>Resolved Date</TableCell> 
                        <TableCell>Contact</TableCell>
                        <TableCell>Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.issues.map(issue => (
                        <IssueRowData issue = {issue} status={2}/>
                    ))}
                </TableBody>
            </Table>
            );
    }
}

export default ResolvedTable;
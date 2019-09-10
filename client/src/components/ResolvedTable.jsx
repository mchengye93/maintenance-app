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
                        <TableCell align='center'>Room ID</TableCell>
                        <TableCell align='center'>Category</TableCell>
                        <TableCell align='center'>Subcategory</TableCell>
                        <TableCell align='center'>Issued Date</TableCell>
                        <TableCell align='center'>Received Date</TableCell>
                        <TableCell align='center'>Resolved Date</TableCell> 
                        <TableCell align='center'>Contact</TableCell>
                        <TableCell align='center'>Cost</TableCell>
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
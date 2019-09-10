import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IssueRowData from './IssueRowData.jsx';


class IssuedTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
        
        };

    }
    componentDidMount() {
        
    }

    render() {
            return (
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={5} align='center' variant='head' style={{backgroundColor:'#E23232', color: 'white' ,fontSize:'14px'}}>
                            PENDING
                            </TableCell>
                            </TableRow>
                            </TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Room ID</TableCell>
                            <TableCell align='center'>Category</TableCell>
                            <TableCell align='center'>Subcategory</TableCell>
                            <TableCell align='center'>Issued Date</TableCell>
                            <TableCell align='center'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.issues.map(issue => (
                            <IssueRowData key ={issue.id} issue ={issue} status={this.props.status} changeIssueStatus = {this.props.changeIssueStatus}/>
                        ))}
                    </TableBody>
                </Table>
            );
    }
}

export default IssuedTable;
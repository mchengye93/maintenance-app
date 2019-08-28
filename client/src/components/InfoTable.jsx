import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Button from '@material-ui/core/Button';

import IssueRowData from './IssueRowData.jsx';



class InfoTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
        
        };

    }
    componentDidMount() {
        

    }

    render() {
        if (this.props.status === 0) {
            return (
                <Table>
                    <TableHead><TableRow><TableCell colSpan={5} align='center' variant='head' style={{backgroundColor:'#E23232', color: 'white' ,fontSize:'14px'}}>Pending</TableCell></TableRow></TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell>Room ID</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>SubCategory</TableCell>
                            <TableCell>Issued Date</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.issues.map(issue => (
                            <IssueRowData issue = {issue}/>
                        ))}
                    </TableBody>
                </Table>
       
            );
        }
        else if (this.props.status === 1) {
            return (
                <Table>
                    <TableHead><TableRow><TableCell colSpan={5} align='center' variant='head' style={{backgroundColor:'#98f22d', color: 'white' ,fontSize:'14px'}}>In Progress</TableCell></TableRow></TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell>Room ID</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>SubCategory</TableCell>
                            <TableCell>Issued Date</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.issues.map(issue => (
                            <IssueRowData issue = {issue}/>
                        ))}
                    </TableBody>
                </Table>
       
            );
        }
        else if (this.props.status === 2) {
            return (
                <Table>
                    <TableHead><TableRow><TableCell colSpan={5} align='center' variant='head' style={{backgroundColor:'#0ba922', color: 'white' ,fontSize:'14px'}}>Completed</TableCell></TableRow></TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell>Room ID</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>SubCategory</TableCell>
                            <TableCell>Issued Date</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.issues.map(issue => (
                            <IssueRowData issue = {issue}/>
                        ))}
                    </TableBody>
                </Table>
       
            );
        }

    }
}
export default InfoTable;
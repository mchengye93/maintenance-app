import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class InfoTable extends Component {
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
                        <TableCell>Room ID</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>SubCategory</TableCell>
                        <TableCell>Issued Date</TableCell>
                        <TableCell><Button>Take Issue</Button></TableCell>

                    </TableRow>
                </TableHead>
            </Table>
               
                
           
        );
    }
}
export default InfoTable;
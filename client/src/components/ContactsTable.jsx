import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import axios from 'axios';


class ContactsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
        
        };

    }
    componentDidMount() {
        axios.get('/api/subcategories')
        .then((response)=> {
           
            this.setState({
                contacts: response.data
             });
        });   
        
    }

    render() {
            return (
                <Table >
                    <TableHead><TableRow><TableCell colSpan={4} align='center' variant='head' style={{backgroundColor:'#E23232', color: 'white' ,fontSize:'14px'}}>Contacts</TableCell></TableRow></TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.contacts.map(contact => (
                            <ContactRowData key ={contact.id} contact ={contact} />
                        ))}
                    </TableBody>
                </Table>
            );
    }
}

export default ContactsTable;
import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


class ContactRowData extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount() { 

    }

    render() {
       
   
            return (
                <TableRow key={this.props.contact.id}>
                    <TableCell>{this.props.contact.name}</TableCell>
                    <TableCell>{this.props.contact.category}</TableCell>
                    <TableCell>{this.props.contact.phone}</TableCell>
                    <TableCell>{this.props.contact.email}</TableCell>
                </TableRow>
                             
            );
    }
}

export default ContactRowData;
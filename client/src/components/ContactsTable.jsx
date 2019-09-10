import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ContactRowData from './ContactRowData.jsx';

import axios from 'axios';


class ContactsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
        contacts: [],
        categories:[],
        contactByCategory: [],
        };
        this.getAllCategories = this.getAllCategories.bind(this);
    }
    componentDidMount() {
        axios.get('/api/contacts')
        .then((response)=> {
           console.log(response.data);
            this.setState({
                contacts: response.data
             });
             this.getAllCategories(response.data);
            
        });   
        
    }
    getAllCategories(data) {
        let category = {};
        let categories = []
        
        for (let i = 0; i < data.length; i++) {
            if(category[data[i].category] === undefined) {
                category[data[i].category] = data[i].category_id;
               categories.push({'category': data[i].category,'value':data[i].category_id });
            }
        }
        this.setState({categories: categories});
     
    }



    render() {
        console.log(this.state);
            return (
                
                <Table>
                     <TableRow>
                         {this.state.categories.map(category => (
                             <TableCell>{category.category}</TableCell>
                        ))}
                    </TableRow>
                    
                    
                    <TableHead><TableRow><TableCell colSpan={4} align='center' variant='head' style={{backgroundColor:'#E23232', color: 'white' ,fontSize:'14px'}}>Contacts</TableCell></TableRow></TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Name</TableCell>
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
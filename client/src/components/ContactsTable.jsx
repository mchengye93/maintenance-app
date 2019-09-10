import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import ContactRowData from './ContactRowData.jsx';
import AddContactForm from './AddContactForm.jsx';
import axios from 'axios';


class ContactsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
        contacts: [],
        categories:[],
        contactsByCategory: [],
        category: '',
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }
    componentDidMount() {
        axios.get('/api/contacts')
        .then((response)=> {
          
            this.setState({
                contacts: response.data,
                contactsByCategory: response.data,
             });
            
            
        });   
        
    }
    handleCategoryChange(e) {
        e.preventDefault();
        let categoryId = e.currentTarget.value;
     
        let category = e.currentTarget.innerText;
        let contacts = this.state.contacts;
        let contactsByCategory = [];
        
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].category_id == categoryId) {
                contactsByCategory.push(contacts[i]);
            }
        }
       
        this.setState({
            contactsByCategory: contactsByCategory , 
            category: category });
        
     
    }



    render() {
       
            return (
                <div id="contacts">
                <AddContactForm categories={this.props.categories} /> 
                  <Grid item xs={12}>
                    <ButtonGroup fullWidth aria-label="full width outlined button group">
                    {this.props.categories.map(category => (
                        <Button variant="outlined" color='primary' onClick={this.handleCategoryChange} value={category.id}>{category.category}</Button>
                    ))}
                    </ButtonGroup>
                 </Grid>
                 <Table>
                    <TableHead><TableRow><TableCell colSpan={this.props.categories.length} align='center' variant='head' style={{backgroundColor:'#3f51b5', color: 'white' ,fontSize:'14px'}}> {this.state.category} CONTACTS</TableCell></TableRow></TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.contactsByCategory.map(contact => (
                            <ContactRowData key ={contact.id} contact ={contact} />
                        ))}
                    </TableBody>
                </Table>
                </div>
                
            );
    }
}

export default ContactsTable;
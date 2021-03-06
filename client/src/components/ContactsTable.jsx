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

import {ExportCSV} from './ExportCSV.jsx';

class ContactsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
        contacts: [],
        categories:{},
        contactsByCategory: [],
        category: '',
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
    }
    componentDidMount() {
        axios.get('/api/contacts')
        .then((response)=> {
            let contacts = response.data;
        

            let categories = contacts.reduce((accumulator, contact) => {
                if (accumulator[contact.category] === undefined) {
                    accumulator[contact.category_id] = contact.category;
                }
                return accumulator;
            }, {});
        
            this.setState({
                contacts: response.data,
                contactsByCategory: response.data,
                categories: categories
             });
             
            
        });   
        
    }
    handleCategoryChange(e) {
        e.preventDefault();
        let categoryId = e.currentTarget.value;
     
        let category = e.currentTarget.innerText;
        let contacts = this.state.contacts;
      
        let contactsByCategory = contacts.filter(
            contact => contact.category_id == categoryId);
       
       
        this.setState({
            contactsByCategory: contactsByCategory , 
            category: category });
        
     
    }
    changeCategory(categoryId) {
      

        axios.get('/api/contacts')
        .then((response)=> {
            let contacts = response.data;
            
            let contactsByCategory = contacts.filter(contact => contact.category_id == categoryId);

            this.setState({
                contacts: contacts,
                contactsByCategory: contactsByCategory , 
                category: this.state.categories[categoryId].toUpperCase() 
                
             });
            
            
        });   
        

    }



    render() {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'-'+today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
       
            return (
                <div id="contacts">
                <AddContactForm categories={this.props.categories} changeCategory={this.changeCategory} /> 
                <ExportCSV csvData={this.state.contactsByCategory} fileName={"maintenanceContacts"+this.state.category+date}/>
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
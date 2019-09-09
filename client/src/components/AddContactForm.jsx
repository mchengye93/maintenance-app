import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import axios from 'axios';

import MenuItem from '@material-ui/core/MenuItem';

// import MaskedInput from 'react-input-mask';



class AddContactForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        open: false,
        name: '',
        categoryId: 1,
        email: '',
        phone: '',
       
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCreateContact = this.handleCreateContact.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    componentDidMount() {
         
    }

    handleClickOpen() {
        this.setState({open: true});
      }

    handleClose() {
        this.setState({open: false});
      }

    handleCreateContact(event) {
    
            const contact = {
                categoryId: this.state.categoryId,
                email: this.state.email,
                phone: this.state.phone,
                name: this.state.name,
            }
            console.log(contact);

            axios.post('/api/contact', contact).then((response)=> {
                this.setState({
                  open: false,
                  phone:'',
                  name: '',
                  email: ''

                });
            }).catch((error)=> {
                alert('Error adding contact');
            })

    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
 
  
        this.setState({
                [name]: value
              });
        
      }

    render() {
   
            return (
                <span style={{textAlign:'left'}}>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                  Add Contact
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Add Contact</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please put corresponding information for the contact.
                    </DialogContentText>
                   
                   <form>

                    

                    <TextField
                      required
                      margin="normal"
                      id="name"
                      label="Name"
                      name="name"
                      placeholder="Full name"
                      onChange={this.handleInputChange}
                      margin="normal"
                      variant="outlined"
                      value = {this.state.name}
                    />
                    <TextField
                        required 
                        id="outlined-select-categories"
                        select
                        label="Category"
                        value={this.state.categoryId}
                        onChange={this.handleInputChange}
                        margin="normal"
                        variant="outlined"
                        name='categoryId'
                    >
                        {this.props.categories.map(category => (
                        <MenuItem key={category.id} value={category.id} >
                            {category.category}
                        </MenuItem>
                        ))}
                    </TextField>


                    
                    <TextField
                      required 
                      margin="normal"
                      id="outline-phone-input"
                      label="Phone"
                      name="phone"
                      type="text"
                      
                      onChange={this.handleInputChange}
                      margin="normal"
                      variant="outlined"
                      placeholder = "(999) 999-9999"
                      value = {this.state.phone}
                    />
                  
                    <TextField
                        margin="normal"
                        id="outlined-email-input"
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="youremail@gmail.com"
                        onChange={this.handleInputChange}
                        margin="normal"
                        variant="outlined"
                        value = {this.state.email}
                      />
                 
                 <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button type="submit"onClick={this.handleCreateContact} color="primary">
                      Add
                    </Button>
                 </DialogActions>
                  </form>
                  </DialogContent>
              
                  
                  
                </Dialog>
              </span>
            );
        }
}

export default AddContactForm;
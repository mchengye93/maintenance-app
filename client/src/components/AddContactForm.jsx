import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

import MenuItem from '@material-ui/core/MenuItem';

import MaskedInput from 'react-input-mask';


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

            axios.post('/api/contact', contact).then((response)=> {
                this.setState({open: false});
            }).catch((error)=> {
                alert('Error creating issue');
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
                <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                  Add Contact
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Create Issue</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please put corresponding information for the contact.
                    </DialogContentText>
                   
                    <form  enctype="multipart/form-data" > 
                    <TextField
                      autoFocus
                      margin="normal"
                      id="name"
                      label="Name"
                      name="name"
                      onChange={this.handleInputChange}
                      margin="normal"
                      variant="outlined"
                      value = {this.state.name}
                    />
                    <TextField
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
                      autoFocus
                      margin="normal"
                      id="outlined-email-input"
                      label="Email"
                      type="email"
                      name="email"
                      onChange={this.handleInputChange}
                      margin="normal"
                      variant="outlined"
                      value = {this.state.email}
                    />
                    
                    <TextField
                      margin="normal"
                      id="outline-phone-input"
                      label="Phone"
                      name="phone"
                      type="text"
                      onChange={this.handleInputChange}
                      margin="normal"
                      variant="outlined"
                      value = {this.state.phone}
                    >
                    <MaskedInput mask="(999) 999-9999" maskChar=" " />
                    </TextField>
                
                     
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleCreate} color="primary">
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            );
        }
}

export default AddContactForm;
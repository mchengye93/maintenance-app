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



class TakeIssueForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        open: false,
        contactId: 1,

        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateIssue = this.handleUpdateIssue.bind(this);

    }
    componentDidMount() {

        axios.get('/api/')
        .then((response)=> {
           
            this.setState({
                subcategories: response.data
             });
             this.handleUpdateSubcategories(1);
        });
                

    }
    handleClickOpen() {
        this.setState({open: true});
      }

    handleClose() {
        this.setState({open: false});
      }
    handleUpdateIssue() {
       
        //Verify that all input has been defined
        let issue = {
            contactId: this.state.contactId,
            issueId: this.props.issueId
        }
        axios.update('/api/issue/received', issue).then((response)=> {
            this.setState({open: false});
            alert('Issue received!');
        }).catch((error)=> {
            alert('Error taking issue');
        })
            
        
      
    }

  
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(target);
        console.log(name);
        console.log(value);
        
     
        this.setState({
                [name]: value
              });
        

      }

    render() {
   
        
            return (
                <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                  Take Issue
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Take Issue</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please pick person who will take over issue.
                    </DialogContentText>
                   
                    <form> 
                   
                    <TextField
                        id="outlined-select-categories"
                        select
                        label="Contact"
                        value={this.state.contacts[0].id}
                        onChange={this.handleInputChange}
                        helperText="Select a contact person"
                        margin="normal"
                        variant="outlined"
                        name='contactId'
                    >
                        {this.state.contacts.map(contact => (
                        <MenuItem key={contact.id} value={contact.id} >
                            {contact.name}
                        </MenuItem>
                        ))}
                    </TextField>                     
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleUpdateIssue} color="primary">
                      Take Issue
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
       
            );
        }
   
}
export default TakeIssueForm;
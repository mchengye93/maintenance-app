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
        contacts: []

        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateIssue = this.handleUpdateIssue.bind(this);

    }
    componentDidMount() {

        axios.get('/api/contacts/categoryId', {params: {categoryId: this.props.issue.category_id}})
        .then((response)=> {
            this.setState({
                contacts: response.data.rows
             });
          
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
            issueId: this.props.issue.id
        }
  
        axios.put('/api/issue/received', issue).then((response)=> {
            this.setState({open: false});
            this.props.changeIssueStatus(0);
           
        }).catch((error)=> {
        
            alert('Error taking issue');
        })
            
        
      
    }

  
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
       
     
        this.setState({
                [name]: value
              });
        

      }

    render() {
   
        
            return (
                <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                  Take Issue
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">
                  Issue #{this.props.issue.id}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please pick the person who will take over issue #{this.props.issue.id}. <br></br>
                      Room No.{this.props.issue.room_id} <br></br>
                      Category: {this.props.issue.category} <br></br>
                      Subcategory: {this.props.issue.subcategory} <br></br>
                      Issued Date: {this.props.issue.date_issued.split('T')[0]}
                    </DialogContentText>
                   
                    <form> 
                   
                    <TextField
                        id="outlined-select-categories"
                        select
                        label="Contact"
                        value={this.state.contactId}
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
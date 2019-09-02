import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';




class SolveForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        open: false,
        comment: '',
        cost: 0

        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSolveIssue = this.handleSolveIssue.bind(this);

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
    handleSolveIssue() {
       
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
                  Solve
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">
                  Issue #{this.props.issue.id}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Room No.{this.props.issue.room_id} <br></br>
                      Category: {this.props.issue.category} <br></br>
                      Subcategory: {this.props.issue.subcategory} <br></br>
                      Issued Date: {this.props.issue.date_issued.split('T')[0]}
                    </DialogContentText>
                   
                    <form> 
                    <TextField
                      margin="dense"
                      id="cost"
                      label="Cost"
                      name="cost"
                      onChange={this.handleInputChange}
                      type="Number"
                      margin="normal"
                      variant="outlined"
                      value = {this.state.cost}
                    />  <br/>  
                    <TextField
                      id="outlined-multiline-static"
                      label="Comments"
                      multiline
                      rows="4"
                      placeholder="Repair details"
                      margin="dense"
                      variant="outlined"
                      name="comment"
                      onChange={this.handleInputChange}
                    />
                           
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleSolveIssue} color="primary">
                      Solve
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
       
            );
        }
   
}
export default SolveForm;
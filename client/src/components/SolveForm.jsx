import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
        this.handleResolveIssue = this.handleResolveIssue.bind(this);

    }
    componentDidMount() {


    }

    handleClickOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleResolveIssue() {

        let issue = {
            cost: this.state.cost,
            comment:this.state.comment,
            issueId: this.props.issue.id
        }
  
        axios.put('/api/issue/resolve', issue).then((response)=> {
            this.setState({open: false});
            this.props.changeIssueStatus(1);
           
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
                    Resolve
                  </Button>
                  <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                    Issue #{this.props.issue.id}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Room No.{this.props.issue.room_id} <br/>
                        Category: {this.props.issue.category} <br/>
                        Subcategory: {this.props.issue.subcategory} <br/>
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
                      <Button onClick={this.handleResolveIssue} color="primary">
                        Resolve
                      </Button>
                    </DialogActions>
                  </Dialog>
              </div>
       
            );
        }
}

export default SolveForm;
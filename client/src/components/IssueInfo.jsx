

import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class IssueInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open:false
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
       

    }
    componentDidMount() {
       
    }

    handleClickOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }
   

    render() {
       
            return (
              
              <div>
                <Button onClick={this.handleClickOpen}>
                  {this.props.issue.room_id}
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">
                  <b>Issue #{this.props.issue.id} - {this.props.issue.category} - {this.props.issue.subcategory}</b>
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      
                    <b>Room No.</b>{this.props.issue.room_id} <br></br>
                    <b>Category:</b> {this.props.issue.category} <br></br>
                    <b>Subcategory:</b> {this.props.issue.subcategory} <br></br>
                    <b>Issued Date:</b> {this.props.issue.date_issued.split('T')[0]} <br></br>
                    <b>Details:</b> {this.props.issue.description} <br></br> <br></br>
                    {(() => {
                            if (this.props.issue.date_resolved) {
                              return(
                              <div>
                                  <b>Contact: </b>{this.props.issue.name} <br/>
                                  <b>Received Date: </b>{this.props.issue.date_received.split('T')[0]} <br/>
                                  <b>Resolved Date: </b>{this.props.issue.date_resolved.split('T')[0]} <br/>
                                  <b>Cost: </b> {this.props.issue.cost} <br/>
                                </div>
                              )
                            } else if (this.props.issue.date_received) {
                              return (
                                <div>
                                  <b>Contact: </b>{this.props.issue.name} <br/>
                                  <b>Received Date: </b>{this.props.issue.date_received.split('T')[0]}
                                </div>
                              )
                            } 
                          })()}


                    </DialogContentText>
                   
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
       
            );
        } 
}

export default IssueInfo;
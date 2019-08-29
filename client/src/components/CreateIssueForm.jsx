import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import MenuItem from '@material-ui/core/MenuItem';


class CreateIssueForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        open: false,
        categoryId: 1,
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
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
    handleCreate() {
        //create called!

        this.setState({open: false});
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
        console.log(this.props.categories);
        console.log(this.state);
        
       
            return (
                <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                  Create
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Create Issue</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please put corresponding information for the issue.
                    </DialogContentText>
                   
                    <form> 
                    <TextField
                      autoFocus
                      margin="dense"
                      id="roomId"
                      label="Room No."
                      name="roomId"
                      onChange={this.handleInputChange}
                      type="Number"
                      margin="normal"
                      variant="outlined"
                      inputProps={{ min: "1", max: "100"}}
                    />
                    <TextField
                        id="outlined-select-categories"
                        select
                        label="Select"
                        value={this.state.categoryId}
                        onChange={this.handleInputChange}
                        helperText="Please select your category"
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
export default CreateIssueForm;
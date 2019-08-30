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


class CreateIssueForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        open: false,
        categoryId: 1,
        subcategoryId: 0,
        subcategories: []
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }
    componentDidMount() {
        axios.get('/api/subcategories', {params:{categoryId: this.state.categoryId}})
        .then((response)=> {
            console.log(response.data);
            this.setState({
                subcategoryId: response.data[0].id,
                subcategories: response.data});
        });
        

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
        
        if (name === 'categoryId') {
            console.log('categoryId change!', value)
            axios.get('/api/subcategories', {params:{categoryId: value}})
            .then((response)=> {
                console.log(response.data);
                this.setState({
                    subcategoryId: response.data[0].id,
                    subcategories: response.data,
                    [name]: value});
                    
            });
        } else {
            this.setState({
                [name]: value
              });
        }

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
                        label="Category"
                        value={this.state.categoryId}
                        onChange={this.handleInputChange}
                        helperText="Select a category"
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
                        id="outlined-select-subcategories"
                        select
                        label="Subcategory"
                        value={this.state.subcategoryId}
                        onChange={this.handleInputChange}
                        helperText="Select a subcategory"
                        margin="normal"
                        variant="outlined"
                        name='subcategoryId'
                    >
                        {this.state.subcategories.map(subcategory => (
                        <MenuItem key={subcategory.id} value={subcategory.id} >
                            {subcategory.subcategory}
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
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


class UpdateIssueForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        open: false,
        categoryId: this.props.issue.category_id,
        subcategoryId: this.props.issue.subcategory_id,
        categories:this.props.categories ,
        subcategories: [],
        subcategoriesByCategory: [],
        roomId: this.props.issue.room_id,
        description:this.props.issue.description,
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateSubcategories = this.handleUpdateSubcategories.bind(this);

    }

    componentDidMount() {
        console.log('calling api subcategory')
        axios.get('/api/subcategories')
        .then((response)=> {
             console.log('response from apu subcategory', response);
            this.setState({
                subcategories: response.data
             });
             this.handleUpdateSubcategories(this.props.issue.subcategory_id);
        });       
    }

    handleClickOpen() {
        this.setState({open: true});
      }

    handleClose() {
        this.setState({open: false});
      }

    handleUpdate(event) {
    
            const issue = {
                categoryId: this.state.categoryId,
                subcategoryId: this.state.subcategoryId,
                roomId: this.state.roomId,
                description: this.state.description
            }

            axios.put('/api/issue', issue).then((response)=> {
               
            }).catch((error)=> {
                alert('Error creating issue');
            })

    }

    handleUpdateSubcategories(categoryId) {
        //on categorychange update currentSubcategoryChoice 
        const subcategories = this.state.subcategories;
        let subcategoriesByCategory = [];

        for (let i = 0; i < subcategories.length; i++) {
            if (subcategories[i]['category_id'] === categoryId) {
                subcategoriesByCategory.push(subcategories[i]);
            }
        }
        this.setState({
            subcategoriesByCategory,
            subcategoryId: subcategoriesByCategory[0].id});

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
 
        if (name === 'categoryId') {
            this.handleUpdateSubcategories(value);
            this.setState({categoryId: value});
          
        } else {
            this.setState({
                [name]: value
              });
        }
      }

    render() {
        console.log(this.props);
        console.log(this.state);
            return (
                <span>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                  Update
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Create Issue</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please put corresponding information for the issue.
                    </DialogContentText>
                   
                    <form  enctype="multipart/form-data" > 
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
                      value = {this.state.roomId}
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
                        id="outlined-select-subcategories"
                        select
                        label="Subcategory"
                        value={this.state.subcategoryId}
                        onChange={this.handleInputChange}
                        margin="normal"
                        variant="outlined"
                        name='subcategoryId'
                    >
                        {this.state.subcategoriesByCategory.map(subcategory => (
                        <MenuItem key={subcategory.id} value={subcategory.id} >
                            {subcategory.subcategory}
                        </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                      id="outlined-multiline-static"
                      label="Comments"
                      multiline
                      rows="4"
                      placeholder="Additional details"
                      margin="normal"
                      variant="outlined"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                    />
                            
                     
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleUpdate} color="primary">
                      Update
                    </Button>
                  </DialogActions>
                </Dialog>
              </span>
            );
        }
}

export default UpdateIssueForm;
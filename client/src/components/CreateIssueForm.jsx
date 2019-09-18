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
        subcategories: this.props.subcategories,
        subcategoriesByCategory: [],
        roomId: 1,
        description:'',
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateSubcategories = this.handleUpdateSubcategories.bind(this);

    }

    componentDidMount() {
  
        if (this.props.subcategories.length !== 0) {
            this.handleUpdateSubcategories(1);
        }
        
     
    }

    handleClickOpen() {
        this.setState({open: true});
      }

    handleClose() {
        this.setState({open: false});
      }

    handleCreate(event) {
    
            const issue = {
                categoryId: this.state.categoryId,
                subcategoryId: this.state.subcategoryId,
                roomId: this.state.roomId,
                description: this.state.description
            }

            axios.post('/api/issue', issue).then((response)=> {
                this.setState({
                    open: false,
                    description: '',
                    roomId: 0,
                });
            }).catch((error)=> {
                alert('Error creating issue');
            })

    }

    handleUpdateSubcategories(categoryId) {
        //on categorychange update currentSubcategoryChoice 
        
        const subcategories = this.props.subcategories;
        let subcategoriesByCategory = [];

        for (let i = 0; i < subcategories.length; i++) {
            if (subcategories[i]['category_id'] === categoryId) {
                subcategoriesByCategory.push(subcategories[i]);
            }
        }
        console.log(subcategoriesByCategory);

        this.setState(
            {subcategoriesByCategory: subcategoriesByCategory , 
            subcategoryId: subcategoriesByCategory[0].id});
        
           

 
        
        
        
   

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
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
                  Create
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
                      onChange={this.handleInputChange}
                    />
                               
{/*                     
                      <input 
                      type="file" 
                      accept="image/*"
                      id="raised-button-file" 
                      name="file"
                       /> */}
                     
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
              </span>
            );
        }
}

export default CreateIssueForm;
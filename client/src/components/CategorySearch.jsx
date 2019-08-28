import React, {Component} from 'react';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


class CategorySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
        this.handleSearchCategory = this.handleSearchCategory.bind(this);
    }
    componentDidMount() {
  
  

    }
    handleSearchCategory(e) {
        e.preventDefault();
        //console.log(e.currentTarget.value);
        let categoryId = e.currentTarget.value;
        this.props.searchCategory(categoryId);
    }

    render() {
        return (
                <Grid item xs={12}>
                    <ButtonGroup fullWidth aria-label="full width outlined button group">
                      {this.props.categories.map(category => (
                        <Button variant="outlined" color='primary' onClick={this.handleSearchCategory} value={category.id}>{category.category}</Button>
                    ))}
                    </ButtonGroup>
                </Grid>
            
        );
        // return(
        //     <Paper>
        //         <Tabs
        //           value={this.state.status}
        //           onChange={this.handleChangeStatus}
        //           indicatorColor="primary"
        //           textColor="primary"
        //           centered
        //         >
        //           <Tab label="Pending" value={0}/>
        //           <Tab label="In Progress" value={1}/>
        //           <Tab label="Resolved" value={2}/>
        //         </Tabs>
        //   </Paper>
  
        //   );

        
    }
}
export default CategorySearch;
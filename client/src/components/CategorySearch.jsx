import React, {Component} from 'react';
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
    }
}

export default CategorySearch;
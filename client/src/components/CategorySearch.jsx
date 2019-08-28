import React, {Component} from 'react';
import axios from 'axios';
// import { Button } from '@material-ui/core';




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
        let categoryId = e.target.value;
        this.props.searchCategory(categoryId);
    }

    render() {
        console.log(this.props.categories);
        return (
                <div>

                    {this.props.categories.map(category => (
                        <button onClick={this.handleSearchCategory} value={category.id}>{category.category}</button>
                    ))}
                    
                </div>
                
           
        );
    }
}
export default CategorySearch;
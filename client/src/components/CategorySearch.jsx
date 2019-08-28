import React, {Component} from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';




class CategorySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
        
    }
    componentDidMount() {
  
  

    }

    render() {
        console.log(this.props.categories);
        return (
                <div>
                    {this.props.categories.map(category => (
                        <Button>{category.category}</Button>
                    ))}
                    
                </div>
                
           
        );
    }
}
export default CategorySearch;
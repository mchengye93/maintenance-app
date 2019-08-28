import React, {Component} from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';




class CategorySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
        
    }
    componentDidMount() {
        axios.get('/api/categories').then((response)=> {
            console.log(response);
            this.setState({categories: response.data});
        })
  

    }

    render() {
        return (
                <div>
                    {this.state.categories.map(category => (
                        <Button>{category}</Button>
                    ))}
                    
                </div>
                
           
        );
    }
}
export default CategorySearch;
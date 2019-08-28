import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import CategorySearch from './CategorySearch.jsx';
import InfoTable from './InfoTable.jsx';
import { compose } from '@material-ui/system';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            issues: [],
            categories: [],
        };

        this.searchCategory = this.searchCategory.bind(this);

    }
    componentDidMount() {
        axios.get('/api/issues/pending')
        .then((response)=> {
            console.log(response);
            this.setState({issues: response.data});
        });
        axios.get('/api/categories')
        .then((response)=> {
            console.log(response);
            this.setState({categories: response.data});
        })
  

    }
    searchCategory(categoryId) {
        console.log(categoryId);
        axios.get('/api/issues/category', {
            params:{categoryId}})
        .then((response)=> {
            console.log(response);
            
        })
    }

    render() {
        return (
                <div id="app">
                <CategorySearch categories={this.state.categories} searchCategory = {this.searchCategory}/>
                <InfoTable issues={this.state.issues}></InfoTable>
                <Button>Test</Button>
                </div>
                
           
        );
    }
}
export default App;
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
            status:0,
            categoryId: 1,
            pendingIssues: [],
            categories: [],
        };

        this.searchCategory = this.searchCategory.bind(this);

    }
    componentDidMount() {
        axios.get('api/issues/pending/category',{
            params:{categoryId: this.state.categoryId}})
        .then((response)=> {
            console.log(response);
            this.setState({pendingIssues: response.data});
        });
        axios.get('/api/categories')
        .then((response)=> {
            console.log(response);
            this.setState({categories: response.data});
        });

        axios.get('api/issues/received/category',{
            params:{categoryId: this.state.categoryId}})
        .then((response)=> {
            console.log(response.data);
            this.setState({receivedIssues: response.data});
        });
  

    }
    searchCategory(categoryId) {
        console.log(categoryId);
        axios.get('/api/issues/pending/category', {
            params:{categoryId}})
        .then((response)=> {
            console.log(response.data);
            this.setState({
                categoryId: categoryId,
                pendingIssues: response.data});
            
        })
    }

    render() {
        if (this.state.status === 0) {
            return (
                <div id="app">
                <CategorySearch categories={this.state.categories} searchCategory = {this.searchCategory}/>
                <InfoTable issues={this.state.pendingIssues} status={this.state.status}></InfoTable>
                <Button>Test</Button>
                </div>
                
        );
        }
      
    }
}
export default App;
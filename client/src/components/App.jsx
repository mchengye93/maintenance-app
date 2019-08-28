import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import CategorySearch from './CategorySearch.jsx';
import IssuedTable from './IssuedTable.jsx';
import InProgressTable from './InProgressTable.jsx';
import ResolvedTable from './ResolvedTable.jsx';
import IssuesStatusOptions from './IssuesStatusOptions.jsx';



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status:0,
            categoryId: 1,
            pendingIssues: [],
            receivedIssues: [],
            solvedIssues: [],
            resolvedIssues: [],
            categories: [],
        };

        this.searchCategory = this.searchCategory.bind(this);
        this.changeIssueStatus = this.changeIssueStatus.bind(this);

    }
    componentDidMount() {
        // axios.get('api/issues/pending/category',{
        //     params:{categoryId: this.state.categoryId}})
        // .then((response)=> {
        //     console.log(response);
        //     this.setState({pendingIssues: response.data});
        // });
        axios.get('/api/categories')
        .then((response)=> {
            console.log(response);
            this.setState({categories: response.data});
        });

        // axios.get('api/issues/received/category',{
        //     params:{categoryId: this.state.categoryId}})
        // .then((response)=> {
        //     console.log(response);
        //     this.setState({receivedIssues: response.data});
            
        // });
  

    }
    searchCategory(categoryId) {
        console.log(categoryId);
        if(this.state.status == 0) {
            axios.get('/api/issues/pending/category', {
                params:{categoryId}})
            .then((response)=> {
                console.log(response.data);
                this.setState({
                    categoryId: categoryId,
                    pendingIssues: response.data});
                
            })
        } else if (this.state.status == 1) {
            axios.get('api/issues/received/category',{
                params:{categoryId}})
            .then((response)=> {
                
                this.setState({
                    categoryId: categoryId,
                    receivedIssues: response.data});
                
            });
        } else if (this.state.status == 2) {
            axios.get('api/issues/resolved/category',{
                params:{categoryId}})
            .then((response)=> {
                console.log(response);
                this.setState({
                    categoryId: categoryId,
                    resolvedIssues: response.data});
                
            });
        } 
       
    }
    changeIssueStatus(status) {
        if(this.state.status == 0) {
            axios.get('/api/issues/pending/category', {
                params:{categoryId:this.state.categoryId}})
            .then((response)=> {
                console.log(response.data);
                this.setState({
                    status: status,
                    pendingIssues: response.data});
                
            })
        } else if (this.state.status == 1) {
            axios.get('api/issues/received/category',{
                params:{categoryId:this.state.categoryId}})
            .then((response)=> {
                
                this.setState({
                    status: status,
                    receivedIssues: response.data});
                
            });
        } else if (this.state.status == 2) {
            axios.get('api/issues/resolved/category',{
                params:{categoryId:this.state.categoryId}})
            .then((response)=> {
                console.log(response);
                this.setState({
                    status: status,
                    resolvedIssues: response.data});
                
            });
        } 
        this.setState({status: status});
    }

    render() {
        console.log(this.state);
        if (this.state.status == 0) {
            return (
                <div id="app">
                <IssuesStatusOptions changeIssueStatus={this.changeIssueStatus}/>
                <CategorySearch categories={this.state.categories} searchCategory = {this.searchCategory}/>
                <IssuedTable issues={this.state.pendingIssues} status={this.state.status}></IssuedTable>
                </div>     
        );
        } else if (this.state.status == 1) {
            return (
                <div id="app">
                <IssuesStatusOptions changeIssueStatus={this.changeIssueStatus}/>
                <CategorySearch categories={this.state.categories} searchCategory = {this.searchCategory}/>
                <InProgressTable issues={this.state.receivedIssues} status={this.state.status}></InProgressTable>
                </div>     
        );
        } else if (this.state.status == 2) {
            return (
                <div id="app">
                <IssuesStatusOptions changeIssueStatus={this.changeIssueStatus}/>
                <CategorySearch categories={this.state.categories} searchCategory = {this.searchCategory}/>
                <ResolvedTable issues={this.state.resolvedIssues} status={this.state.status}></ResolvedTable>
                </div>     
        );
        }
      
    }
}
export default App;
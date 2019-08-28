import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import CategorySearch from './CategorySearch.jsx';
import IssuedTable from './IssuedTable.jsx';
import InProgressTable from './InProgressTable.jsx';
import ResolvedTable from './ResolvedTable.jsx';
import IssuesStatusOptions from './IssuesStatusOptions.jsx';

import AppBar from '@material-ui/core/AppBar';



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
        axios.get('/api/issues/pending')
        .then((response)=> {
            this.setState({pendingIssues: response.data});
        });
        axios.get('/api/categories')
        .then((response)=> {
            this.setState({categories: response.data});
        });

    }
    searchCategory(categoryId) {
        if(this.state.status == 0) {
            axios.get('/api/issues/pending/category', {
                params:{categoryId}})
            .then((response)=> {
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
                this.setState({
                    categoryId: categoryId,
                    resolvedIssues: response.data});
                
            });
        } 
       
    }
    changeIssueStatus(status) {
        console.log('App changeissue satus called!', status);
        if(status == 0) {
            axios.get('/api/issues/pending/category', {
                params:{categoryId:this.state.categoryId}})
            .then((response)=> {
                this.setState({
                    status: status,
                    pendingIssues: response.data});
                
            })
        } else if (status == 1) {
            axios.get('api/issues/received/category',{
                params:{categoryId:this.state.categoryId}})
            .then((response)=> {
                
                this.setState({
                    status: status,
                    receivedIssues: response.data});
                
            });
        } else if (status == 2) {
            axios.get('api/issues/resolved/category',{
                params:{categoryId:this.state.categoryId}})
            .then((response)=> {
                this.setState({
                    status: status,
                    resolvedIssues: response.data});
                
            });
        } 
        this.setState({status: status});
    }

    render() {
    
        if (this.state.status == 0) {
            return (
                <div id="app">
                <AppBar color="primary" position="static">
                    <h2>Maintenance App</h2>
                    <IssuesStatusOptions changeIssueStatus={this.changeIssueStatus}/>
                    <CategorySearch categories={this.state.categories} searchCategory = {this.searchCategory}/>
                </AppBar>

                <IssuedTable issues={this.state.pendingIssues} status={this.state.status}></IssuedTable>
                </div>     
        );
        } else if (this.state.status == 1) {
            return (
                <div id="app">
                <AppBar color="primary" position="static">
                    <h2>Maintenance App</h2>
                    <IssuesStatusOptions changeIssueStatus={this.changeIssueStatus}/>
                    <CategorySearch categories={this.state.categories} searchCategory = {this.searchCategory}/>
                </AppBar>
                <InProgressTable issues={this.state.receivedIssues} status={this.state.status}></InProgressTable>
                </div>     
        );
        } else if (this.state.status == 2) {
            return (
                <div id="app">
                <AppBar color="primary" position="static">
                    <h2>Maintenance App</h2>
                    <IssuesStatusOptions changeIssueStatus={this.changeIssueStatus}/>
                    <CategorySearch categories={this.state.categories} searchCategory = {this.searchCategory}/>
                </AppBar>
                <ResolvedTable issues={this.state.resolvedIssues} status={this.state.status}></ResolvedTable>
                </div>     
        );
        }
      
    }
}
export default App;
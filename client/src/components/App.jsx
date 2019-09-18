
import React, {Component} from 'react';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';

import CategorySearch from './CategorySearch.jsx';
import IssuedTable from './IssuedTable.jsx';
import InProgressTable from './InProgressTable.jsx';
import ResolvedTable from './ResolvedTable.jsx';
import IssuesStatusOptions from './IssuesStatusOptions.jsx';
import ReportData from './ReportData.jsx';

import CreateIssueForm from './CreateIssueForm.jsx';

import ContactsTable from './ContactsTable.jsx';

import {ExportCSV} from './ExportCSV.jsx';


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
            subcategories: [],
            contactCategory: '',
        };

        this.searchCategory = this.searchCategory.bind(this);
        this.changeIssueStatus = this.changeIssueStatus.bind(this);

    }

    componentDidMount() {

        axios.all([
            axios.get('/api/issues/pending'),
            axios.get('/api/categories'),
            axios.get('/api/subcategories')
          ])
          .then(responseArr => {
            //this will be executed only when all requests are complete
            console.log('Date created: ', responseArr[0].data);
            console.log('Date created: ', responseArr[1].data);
            console.log('Date created: ', responseArr[2].data);
            this.setState({
                pendingIssues: responseArr[0].data,
                categories: responseArr[1].data,
                subcategories: responseArr[2].data
            });

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
        console.log(this.state);
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'-'+today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        if (this.state.status == 0) {

            return (
                <div id="app">
                    <AppBar color="primary" position="static">
                        <h2 style={{textAlign: 'center', fontFamily: "Roboto"}}>Maintenance App</h2>
                    </AppBar> 
                    <IssuesStatusOptions changeIssueStatus={this.changeIssueStatus}/>
                    <CategorySearch categories={this.state.categories} searchCategory = {this.searchCategory}/>
                    { this.state.categories.length!==0 && this.state.subcategories.length !== 0 ? <CreateIssueForm categories={this.state.categories} subcategories={this.state.subcategories}/> : null }
                    {/* <CreateIssueForm categories={this.state.categories} subcategories={this.state.subcategories}/>  */}
                    <ExportCSV csvData={this.state.pendingIssues} fileName={"pendingMaintenanceIssues"+date} />
                    <IssuedTable issues={this.state.pendingIssues} status={this.state.status} changeIssueStatus = {this.changeIssueStatus} categories={this.state.categories}></IssuedTable>
                </div>     
                );

        } else if (this.state.status == 1) {

            return (
                <div id="app">
                    <AppBar color="primary" position="static">
                        <h2 style={{textAlign: 'center'}}>Maintenance App</h2>
                    </AppBar>
                    <IssuesStatusOptions changeIssueStatus={this.changeIssueStatus}/>
                    <CategorySearch categories={this.state.categories} searchCategory = {this.searchCategory}/>
                    <CreateIssueForm categories={this.state.categories} subcategories={this.state.subcategories}/>
                    <ExportCSV csvData={this.state.receivedIssues} fileName={"inProgressMaintenanceIssues"+date }/>
                    <InProgressTable issues={this.state.receivedIssues} status={this.state.status} changeIssueStatus = {this.changeIssueStatus} categories={this.state.categories}></InProgressTable>
                </div>     
                );

        } else if (this.state.status == 2) {

            return (
                <div id="app">
                    <AppBar color="primary" position="static">
                        <h2 style={{textAlign: 'center'}}>Maintenance App</h2>
                    </AppBar>
                    <IssuesStatusOptions changeIssueStatus={this.changeIssueStatus}/>
                    <CategorySearch categories={this.state.categories} searchCategory = {this.searchCategory}/>
                    <CreateIssueForm categories={this.state.categories} subcategories={this.state.subcategories}/> 
                    <ExportCSV csvData={this.state.resolvedIssues} fileName={"resolvedMaintenanceIssues"+date} />
                    <ResolvedTable issues={this.state.resolvedIssues} status={this.state.status}></ResolvedTable>
                </div>     
                );
        } else if (this.state.status == 3) {
            return (
                <div id ="app">
                    <AppBar color="primary" position="static">
                        <h2 style={{textAlign: 'center', fontFamily: "Roboto"}}>Maintenance App</h2>
                    </AppBar> 
                    <IssuesStatusOptions changeIssueStatus={this.changeIssueStatus}/>
                    
                    <ReportData/>
                
                </div>
            )
        } else if (this.state.status == 4) {
            return (
                <div id ="app">
                <AppBar color="primary" position="static">
                    <h2 style={{textAlign: 'center', fontFamily: "Roboto"}}>Maintenance App</h2>
                </AppBar> 
                <IssuesStatusOptions changeIssueStatus={this.changeIssueStatus}/>
                <ContactsTable categories={this.state.categories} contactCategory ={this.state.contactCategory}/>
            
            </div>
            )
        }
    }
}
export default App;
import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import CategorySearch from './CategorySearch.jsx';
import InfoTable from './InfoTable.jsx';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            issues: [],
            categories: [],
        };

    }
    componentDidMount() {
        axios.get('/api/issues/pending').then((response)=> {
            console.log(response);
            this.setState({issues: response.data});
        });
        axios.get('/api/categories').then((response)=> {
            console.log(response);
            this.setState({categories: response.data});
        })
  

    }

    render() {
        return (
                <div id="app">
                <CategorySearch categories={this.state.categories}/>
                <InfoTable issues={this.state.issues}></InfoTable>
                <Button>Test</Button>
                </div>
                
           
        );
    }
}
export default App;
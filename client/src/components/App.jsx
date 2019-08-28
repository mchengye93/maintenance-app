import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }
    componentDidMount() {
  

    }

    render() {
        return (
            
              
                <div id="app">
                <MaterialTable data={this.state.data}></MaterialTable>
                <Button>Test</Button>
                </div>
                
           
        );
    }
}
export default App;
import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import InfoTable from './InfoTable.jsx';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
        
        };

    }
    componentDidMount() {
  

    }

    render() {
        return (
            
              
                <div id="app">
                <InfoTable></InfoTable>
                <Button>Test</Button>
                </div>
                
           
        );
    }
}
export default App;
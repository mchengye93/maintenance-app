import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }
    componentDidMount() {
        axios.get('/api/issues/vip/pending')
        .then((response)=> {
            console.log(response);
        }).catch((error)=> {
            console.log(error);
        });

    }

    render() {
        return (
            <div>
                <div id="app"></div>
                <h1>Maintenance Application</h1>
            </div>
        )
    }
}
export default App;
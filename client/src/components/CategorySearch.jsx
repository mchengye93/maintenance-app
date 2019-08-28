import React, {Component} from 'react';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';





class CategorySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
        this.handleSearchCategory = this.handleSearchCategory.bind(this);
    }
    componentDidMount() {
  
  

    }
    handleSearchCategory(e) {
        e.preventDefault();
        let categoryId = e.target.value;
        this.props.searchCategory(categoryId);
    }

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <span>
                      {this.props.categories.map(category => (
                        <button onClick={this.handleSearchCategory} value={category.id}>{category.category}</button>
                    ))}
                </span>
            </div>
             
                  
        );
        // return(
        //     <Paper>
        //         <Tabs
        //           value={this.state.status}
        //           onChange={this.handleChangeStatus}
        //           indicatorColor="primary"
        //           textColor="primary"
        //           centered
        //         >
        //           <Tab label="Pending" value={0}/>
        //           <Tab label="In Progress" value={1}/>
        //           <Tab label="Resolved" value={2}/>
        //         </Tabs>
        //   </Paper>
  
        //   );

        
    }
}
export default CategorySearch;
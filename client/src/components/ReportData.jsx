import React, {Component} from 'react';
import axios from 'axios';

import { BarChart } from "react-d3-components";


class ReportData extends Component {
    constructor(props) {
        super(props);
        this.state = {
          issues: [],
          data: [
            {
            label: 'somethingA',
            values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
            },
            {
            label: 'somethingB',
            values: [{x: 'SomethingA', y: 6}, {x: 'SomethingB', y: 8}, {x: 'SomethingC', y: 5}]
            },
            {
            label: 'somethingC',
            values: [{x: 'SomethingA', y: 6}, {x: 'SomethingB', y: 8}, {x: 'SomethingC', y: 5}]
            }
        ]
        };
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.parseIssues = this.parseIssues.bind(this);
    }
    componentDidMount() {
        axios.get('/api/issues/resolved')
        .then((response)=> {
            this.setState({
                issues: response.data
            });
            this.parseIssues(response.data);
        })
    }
    handleChangeStatus(e) {
        e.preventDefault();
    
        
    }
    parseIssues(issues) {
        //parse through issue and calculate total cost for each category
        let costByCategory = {};

        for (let i = 0; i < issues.length; i++) {
            let category = issues[i].category;
            let cost = issues[i].cost;
            let date = new Date(issues[i].date_resolved);
           
            let month = date.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
            let year = date.getFullYear();
            
            let monthYear =  month + "/" + year;
            //console.log(monthYear);

            if (costByCategory[category]) {
                //Get object and add monthyear object
                let categoryObject = costByCategory[category];
                
                if (categoryObject[monthYear]) {
                    categoryObject[monthYear] += cost;
                } else {
                    categoryObject[monthYear] = cost;
                }
                

            } else {
                costByCategory[category] = { [monthYear] : cost};
            }
        }

        console.log(costByCategory);
    }

    render() {
        console.log(this.state);
        return(
            <div id="report">
                Inside report data!
                <BarChart
                    groupedBars
                    data={this.state.data}
                    width={400}
                    height={400}
                    margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
            </div>
     
        
        );
    }
}

export default ReportData;
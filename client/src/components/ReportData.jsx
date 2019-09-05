import React, {Component} from 'react';
import axios from 'axios';
import  d3 from 'd3'

import { PieChart } from "react-d3-components";
import BarChart from "./BarChart.jsx";
import GroupedBarChart from './GroupedBarChart.jsx';


class ReportData extends Component {
    constructor(props) {
        super(props);
        this.state = {
          issues: [],
        //   data: 
        //    [ {
        //        label: '7/19',
        //         values: [{x: 'Electrical', y: 10}, {x: 'Plumbing', y: 4}, {x: 'Fixture', y: 3}]
        //     },
        //     {
        //         label: '8/19',
        //         values: [{x: 'Electrical', y: 100}, {x: 'Plumbing', y: 4}, {x: 'Fixture', y: 3}]
        //         },
        //     ],
     
        };
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.parseIssues = this.parseIssues.bind(this);
        this.parseCosts = this.parseCosts.bind(this);
    }
    componentDidMount() {
        // axios.get('/api/issues/resolved')
        // .then((response)=> {
        //     this.setState({
        //         issues: response.data
        //     });
        //     this.parseIssues(response.data);
        // })

        axios.get('/api/cost/category')
        .then((response)=> {
            // this.setState({
            //     cost: response.data
            // });
            this.parseCosts(response.data);
            //this.parseIssues(response.data);
        })
    }
    handleChangeStatus(e) {
        e.preventDefault();
    
        
    }
    parseCosts(costs) {
        let costByCategoryMonth = {};

        // {
        //     "month_resolved": "2019-07-01T07:00:00.000Z",
        //     "category": "Fixture",
        //     "sum": "916"
        // },

        for (let i = 0; i < costs.length; i++) {
            let category = costs[i]["category"];
            let monthYear = costs[i]["month_resolved"].split("-01")[0];
            let cost = costs[i]["sum"];
            
            if (costByCategoryMonth[monthYear]) {
                costByCategoryMonth[monthYear]['values'].push({category: category, cost: cost});
            } else {
                costByCategoryMonth[monthYear] = {
                    'monthYear': monthYear,
                    'values':[{category: category, cost: cost}]};
            }
            
        }
        this.setState({cost: costByCategoryMonth});

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
        const pieCharts = [];
        console.log(this.state);
        var tooltipBar = function(label,y) {
            return  label + ': ' + y ;
        };
        if (this.state.cost !== undefined) {
            for (let key in this.state.cost) {
                pieCharts.push(
                <div>
                <h3 style={{margin:'0px 180px'}}> Maintenance Cost Report for {this.state.cost[key].label}</h3>   
                <PieChart
                    data={this.state.cost[key]}
                    tooltipHtml={tooltipBar}
                    width={600}
                    height={400}
                    margin={{top: 10, bottom: 10, left: 10, right: 10}}
                    sort={sort}
                    />
                </div>)
            }
        }
       
      
        let sort = null;
        return(
            
            <div id="report">
 
                {/* {pieCharts} */}
                {/* <BarChart/> */}
                <GroupedBarChart/>
                 
            </div>
     
        
        );
    }
}

export default ReportData;
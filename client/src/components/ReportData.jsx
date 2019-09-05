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

        };
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.parseCosts = this.parseCosts.bind(this);
    }
    componentDidMount() {
     
        axios.get('/api/cost/category')
        .then((response)=> {
            this.parseCosts(response.data);
        })
    }
    handleChangeStatus(e) {
        e.preventDefault();
    
        
    }
    parseCosts(costs) {
        let costByCategoryMonth = {};


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
        let monthResults = [];
        for (let key in costByCategoryMonth) {
            monthResults.push(costByCategoryMonth[key]);
        }
        this.setState({cost: monthResults});

    }

    render() {
 
        if (this.state.cost !== undefined){
          
            return(
            
                <div id="report">
                    <GroupedBarChart data={this.state.cost}/>       
                </div>
           
            );
        } else {
            return(
                <div id="report">
                Waiting for data to load....
                </div>

            )
        }
   
    }
}

export default ReportData;
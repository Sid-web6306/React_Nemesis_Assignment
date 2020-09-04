import React from 'react'
import {Link,Redirect} from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";


export default class Admin extends React.Component {
	constructor(props){
		super(props)
		
		const token1= localStorage.getItem("token1");
		const token2 = localStorage.getItem("token2");
		let loggedIn1=true;
		let loggedIn2 = true;

		if(token1===null){
			loggedIn1 = false;
		}
		if(token2===null){
			loggedIn2 = false;
		}
		this.state={
			loggedIn1,
			loggedIn2,
			users:[],
			isPending:true
			
		}
	}


	async componentDidMount() {
		
    let res = await axios.get('https://api.github.com/repositories/19438/issues');
    console.log(res);
    let users = res.data;
    
    

    this.setState({users,isPending:false});
  }
  render(){
  	if(this.state.loggedIn1){
  		

  	const options = {
    chart:{
      type:'column',
    },
    credits:{
      enabled:false
    },
    title: {
      text: 'No. of Comments on Updated_At Date of Users on Github'
    },
    subtitle: {
      		  text: 'Source: <a href="https://api.github.com/repositories/19438/issues" target="_blank">api.github.com</a>'
    },
    yAxis: {
            title: {
                text: 'Comments'
            }
      },
    xAxis:{
      title:{
          text: 'Updated_At'
      },
      categories:this.state.users.map(user=> user.updated_at.slice(0,10)),
      
    },
   
    tooltip: {
      backgroundColor: '#FCFFC5',
      borderColor: 'black',
      borderRadius: 10,
      borderWidth: 2,
      crosshairs: [true,true],
      shared: true,
      hideDelay: 2000,
      delayForDisplay: 2000,
   	  useHTML: true
    },
    plotOptions: {
    line: {
        dataLabels: {
            enabled: true
        }
      },
      
    },
    series:[
      {
      	dataSorting: {
			  enabled: true,
			  sortKey:'custom.value'
    	},
        data: this.state.users.map(user=> user.comments),
       
      },

    ],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }


  };
	
	return (
		this.state.isPending ? 
			 	<div>
		         <ReactLoading className="loader center" type={"spinningBubbles"} color={"black"}  height={'10%'} width={'10%'} />
		     </div>: 
		     <div>
		        <Link className="fr f4" to="/logout">LogOut</Link>		
				 <h1>Welcome, John</h1>
				 <HighchartsReact highcharts={Highcharts} options={options} />
				 </div>
		  )
		
	}else if(this.state.loggedIn2){
		const options = {
		    chart:{
		      plotBackgroundColor: null,
		      plotBorderWidth: null,
		      plotShadow: false,
		      type: 'pie'
		    },
		    credits:{
		      enabled:false
		    },
		    title: {
		      text: 'No.of Comments Created on  an Issue on Github'
		    },
		    subtitle: {
      		  text: 'Source: <a href="https://api.github.com/repositories/19438/issues" target="_blank">api.github.com</a>'
    		},
		    toottip:{
		      pointFormat:'{series.name}:<b>{point.percentage:.1f}%</b>',
		      formatter: function() {
			          var sliceIndex = this.point.index;
			          var sliceName = this.series.chart.axes[0].categories[sliceIndex]  ;
			          return sliceName
			        }
		    },
		    accessibility: {
		        point: {
		            valueSuffix: '%'
		        }
		    },
		    xAxis:{
		    	categories:this.state.users.map(user=>user.title),
		    	 title: {
				      text: null
				    }
		    },
		    
		    plotOptions: {
		      pie: {
		        allowPointSelect: true,
		        cursor: 'pointer',
		        dataLabels: {
		          enabled: true,
		          format: '<b>{point.name}</b>: {point.percentage: .1f} %',
		          connectorColor: 'silver'
		        },
		        showInLegends:true,

		         
		         dataLabels: {
			        formatter: function() {
			          var sliceIndex = this.point.index;
			          var sliceName = this.series.chart.axes[0].categories[sliceIndex]  ;
			          return sliceName
			        }
			      }
			    },
			    
	       },
		    series:[
		      {	
		        name:"Comments",
		        colorByPoint: true,
		        data: this.state.users.map(user=> user.comments),
		      }

		    ],
		  };
		return (
		
			this.state.isPending ? (
				<div>
	          <ReactLoading className="loader center" type={"spinningBubbles"} color={"black"} height={'10%'} width={'10%'}/>
	          </div>
	       		 ) : (
	       		 <div>
	          <Link className = "fr f4" to="/logout">LogOut</Link>
			        <h1>Welcome, Micky</h1>
		        	<HighchartsReact highcharts={Highcharts} options={options}/>
		        	</div>
       		 )	
		)
	}else{
		return <Redirect to="/" />
		} 
	}
}
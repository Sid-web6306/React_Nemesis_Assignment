import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
class FormExampleForm extends Component{
  constructor(props){
    super(props)
    

    const token1= localStorage.getItem("token1");
    const token2 = localStorage.getItem("token2");
    let loggedIn1,loggedIn2 = true;

    if(token1===null){
      loggedIn1 = false;
    }
    if(token2===null){
      loggedIn2 =false;
    }

    this.state = {
      username: '',
      password: '',
      loggedIn1,
      loggedIn2
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  onChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit = (e)=>{
    e.preventDefault();
    const {username,password} = this.state;
    //Logic
    if(username==="John" && password === "12345"){
      localStorage.setItem("token1","aosidfggeayOGRYSFGVYUFGDYASGFSDHAFCSCV");
      this.setState({
        loggedIn1:true
      })
    }else if(username==='MICKY' && password==="98765"){
      localStorage.setItem("token2","sdkufgbcdsgfuyagcfdasgfyugdsafgdsiaofguygfo");
      this.setState({
        loggedIn2:true
      })
    }

    else{
      alert("Invalid Username and Password!!");
    }


  }

  render(){
    if(this.state.loggedIn1 || this.state.loggedIn2){
      return <Redirect to="/home"/>
    }
    
      return (
        <div className="pa4 black-80">
          <h1 className="tc">Log In</h1>
          <form className="measure center" onSubmit={this.onSubmit}>
            <label className="db fw6 lh-copy f3">Username </label>
              <input className="pa2 input-reset ba bg-transparent  w-100"type="text" name="username" value={this.state.username} placeholder='Enter Username' onChange={this.onChange}/>
              <br/><br/><label className="db fw6 lh-copy f3">Password </label>
              <input className="pa2 input-reset ba bg-transparent   w-100" value= {this.state.password} type="password" name="password" placeholder=' Enter Password' onChange={this.onChange}/>
              <br/><br/><input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f3 dib" type="Submit" value="Log In" />
          </form>
        </div> 
      )
  }
}
  

export default FormExampleForm

import React,{Component} from 'react'
import gravatar  from '../Images/octocat.png'

class Auth extends Component{
  render(){
    return(
        <img src={gravatar} />
    )
  }
}

export default Auth
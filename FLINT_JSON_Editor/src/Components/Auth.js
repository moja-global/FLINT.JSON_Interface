import React,{Component} from 'react'
import Gravatar  from '../Images/octocat.png'

class Auth extends Component{
  render(){
    return(
        <img src={Gravatar} />
    )
  }
}

export default Auth
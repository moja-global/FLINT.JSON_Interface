import React,{Component} from 'react'
import gravatar  from '../Images/octocat.png'

class App extends Component{
  render(){
    return(
        <img src={gravatar} />
    )
  }
}

export default App
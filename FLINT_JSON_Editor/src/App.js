import React,{Component} from 'react'
import Auth from './Components/Auth'
import './css/App.css'
import Logo from './Images/logo.png'
// const App = () => (
//   <div>
//     <h1>Hello React</h1>
//   </div>
// )

class App extends Component{
  render(){
    return(
      <div className="background">
        <div id="container">
		    	<div id="logo">
            <img src={Logo} />
          </div>

          <div id="navigator">

            <div id="auth">
              <Auth />
            </div>

            <div id="wizard">

            </div>
          </div>
	    	</div>
      </div>
    )
  }
}

export default App
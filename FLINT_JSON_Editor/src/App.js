import React,{Component} from 'react'
import Auth from './Components/Auth'
import StartupWizard from './Components/StartupWizard'
import './css/App.css'
import Logo from './Images/logo.png'

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
              <StartupWizard />
            </div>
            
          </div>
	    	</div>
      </div>
    )
  }
}

export default App
import React from 'react';
import '../css/App.css';
import Logo from '../Images/logo.png';
import Auth from './Auth';
import StartupWizard from './StartupWizard';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
  
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

export default function AppComponent(props) {
  const classes = useStyles();
//StartupWizard will be used to load the swipeable AppBar
    return(
        <div className="background" id="main">
        <div id="container">
		    	<div id="logo">
            <img src={Logo} />
          </div>

          <div id="navigator">

            <div id="auth">
              <Auth />
            </div>

            <div id="wizard">
              <StartupWizard onRadioChange2={(val1)=>{console.log("AppComponent#"+val1);props.onRadioChange3(val1)}} showSnack={(val2)=>{props.showSnack2(val2)}} />
            </div>
          </div>
	    	</div>
      </div>
    );
}

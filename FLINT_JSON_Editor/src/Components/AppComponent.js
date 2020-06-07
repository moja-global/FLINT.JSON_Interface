import React from 'react';
import '../css/App.css';
import Logo from '../Images/logo.png';
import Auth from './Auth';
import StartupWizard from './StartupWizard';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { checkPropTypes } from 'prop-types';

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
              <StartupWizard onRadioChange2={(val1)=>{console.log("AppComponent#"+val1);props.onRadioChange3(val1)}}/>
            </div>
            
            {/* <div id="button" style={{float: "right"}}>
              
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" className={classes.margin}  onClick={()=>{}}>Next ></Button>
              </ThemeProvider>
              
            </div> */}
          </div>
	    	</div>
      </div>
    );
}

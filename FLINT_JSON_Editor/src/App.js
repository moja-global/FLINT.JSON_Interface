import React,{Component} from 'react'
import Auth from './Components/Auth'
import StartupWizard from './Components/StartupWizard'
import './css/App.css'
import Logo from './Images/logo.png'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ScratchJSONEditor from './Components/ScratchJSONEditor';
import AppComponent from './Components/AppComponent';
import ErrorBoundary from './ErrorBoundary';

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

export default function App() {
  const classes = useStyles();
  const [disp,setDisp] = React.useState(true);
  const [routing,setRouting] = React.useState("App");
    return(
      <Router>
        { disp && <AppComponent onRadioChange3={(val)=>{console.log("App"+val);setRouting(val)}}/> }
            {/* <div id="button" > */}
              {disp && <Link to={"/"+routing}>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" className={classes.margin} style={{float: "right"}}  onClick={()=>{document.body.style.backgroundImage="none";setDisp(!disp);}}>Next ></Button>
              </ThemeProvider>
              </Link>}
            {/* </div> */}
      <Switch>
          <Route path="/ScratchJSONEditor">
            <ScratchJSONEditor onHome={()=>{setDisp(true)}} />
          </Route>
          <Route path="/users">
            {/* <Users /> */}
          </Route>
          <Route path="/">
            {/* <Home /> */}
          </Route></Switch>
      
    </Router>
    );
}


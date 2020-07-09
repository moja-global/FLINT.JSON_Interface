import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import './css/App.css'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import ScratchJSONEditor from './Components/ScratchJSONEditor';
import AppComponent from './Components/AppComponent';
import bgImg from './Images/green.jpg';
import SnackBar from './Components/SnackBar';
import {toggleEditorEntry, EditorEntryDirectory, EditorEntryFiles} from './Components/ContextManager';
import EditorEntry from './Components/EditorEntry';

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
  const [SnackDisp,setSnackDisp] = React.useState(false);
  const [component,setComponent] = React.useState(false);
  const [dispScratch,setDispScratch] = React.useState(false);
  const [dispEditorEntry, setDispEditorEntry] = React.useContext(toggleEditorEntry);

  if(component)
  {
    if(component=="ScratchJSONEditor")
    {
      setComponent(false);
      ReactDOM.render(<ThemeProvider theme={theme}>
        <Button id="next_btn" variant="contained" color="primary" className={classes.margin} style={{float: "right"}} onClick={()=>{
          setDisp(false);
          document.body.style.backgroundImage='none';
          setDispScratch(true);
        }} >Next</Button>
      </ThemeProvider>,document.getElementById("buttonContainer"));
    }
  }

  function resetApp() {
    setDisp(true);
    document.body.style.backgroundImage=`url(${bgImg})`;
    // document.getElementById("AppContainer").innerHTML="";
  }

  function resetBtn(){
    ReactDOM.render(<ThemeProvider theme={theme}>
      <Button id="next_btn" variant="contained" color="primary" className={classes.margin} style={{float: "right"}} onClick={()=>setSnackDisp(true)} >Next</Button>
    </ThemeProvider>,document.getElementById("buttonContainer"));
  }

  const Comp = () =>{
    return(<>
    { disp && <AppComponent onRadioChange3={(val)=>{setComponent(val)}} showSnack2={(val1)=>{resetBtn()}}/> }
        
        <div id="AppContainer">
          { dispScratch && <ScratchJSONEditor onHome={(val)=>{resetApp();setDispScratch(false);}} /> }
        </div>
        {disp && <div id="buttonContainer">
          <ThemeProvider theme={theme}>
            <Button id="next_btn" variant="contained" color="primary" className={classes.margin} style={{float: "right"}} onClick={()=>setSnackDisp(true)} >Next</Button>
          </ThemeProvider>
        </div>}

        { SnackDisp && <SnackBar message="Please choose an option!" onComplete={()=>{setSnackDisp(false);console.log("sna")}}/>}
   </>)}
    return(
      <div>
        <toggleEditorEntry.Provider value={[dispEditorEntry,setDispEditorEntry]}>
          {dispEditorEntry.disp && <EditorEntry files={React.useContext(EditorEntryFiles)} directory={React.useContext(EditorEntryDirectory)} />}
          {!dispEditorEntry.disp && <Comp />}
        </toggleEditorEntry.Provider>
        
        
        
        
      </div>
    );
}


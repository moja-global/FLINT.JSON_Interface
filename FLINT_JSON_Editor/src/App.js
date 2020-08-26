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
import {ToggleEditorEntry, EditorEntryFiles, EditorEntryDirectory, EditorEntryFilesProvider} from './Components/ContextManager';
import EditorEntry from './Components/EditorEntry';
const isDev = require('electron-is-dev');

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
  const [dispScratch,setDispScratch] = React.useState(false);
  const [dispEditorEntry, setDispEditorEntry] = React.useContext(ToggleEditorEntry);
  const [Files,setFiles]=React.useContext(EditorEntryFiles);

  if(!isDev)// hacky fix to remove console clutter in production(speeds up the app)
  console.log = function() {}

  //used to switch b/w two types of editors and dynamically adjust the UI
    function LoadEditor(val){
      if(val=="ScratchJSONEditor")
      {
        ReactDOM.render(<ThemeProvider theme={theme}>
          <Button id="next_btn" variant="contained" color="primary" className={classes.margin} style={{float: "right"}} onClick={()=>{
            setDisp(false);
            document.body.style.backgroundImage='none';
            setDispScratch(true);//Hook handling the display of ScratchJSONEditor
          }} >Next</Button>
        </ThemeProvider>,document.getElementById("buttonContainer"));
      }
      else if(val=="FormEditor")
      {
        ReactDOM.render(<ThemeProvider theme={theme}>
          <Button id="next_btn" variant="contained" color="primary" className={classes.margin} style={{float: "right"}} onClick={()=>{
            setDisp(false);
            document.body.style.backgroundImage='none';
            setDispEditorEntry(true);//Context handling the display of Form like Editor
          }} >Next</Button>
        </ThemeProvider>,document.getElementById("buttonContainer"));
      }
    }

  //Reset the background image
  function resetApp() {
    setDisp(true);
    document.body.style.backgroundImage=`url(${bgImg})`;
    // document.getElementById("AppContainer").innerHTML="";
  }

  //Reset the Next Button to its normal behaviour
  function resetBtn(){
    ReactDOM.render(<ThemeProvider theme={theme}>
      <Button id="next_btn" variant="contained" color="primary" className={classes.margin} style={{float: "right"}} onClick={()=>setSnackDisp(true)} >Next</Button>
    </ThemeProvider>,document.getElementById("buttonContainer"));
  }

  //Driver Component to load the upcoming Components and UI
  //involves prop drilling to communicate over components, have a scope to consider Context messaging in future
  const Comp = () =>{
    return(<>
    { disp && <AppComponent onRadioChange3={(val)=>{LoadEditor(val)}} showSnack2={(val1)=>{resetBtn()}}/> }
        
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
    
        {
          dispEditorEntry?<EditorEntry files={Files.files} directory={Files.directory} />: <Comp />
        }
        
      </div>
  );
}


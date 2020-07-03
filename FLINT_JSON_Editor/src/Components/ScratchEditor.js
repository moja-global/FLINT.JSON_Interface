import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SaveIcon from '@material-ui/icons/Save';
import HomeIcon from '@material-ui/icons/Home';
import "../css/ScratchJSONEditor.css";
import "../../node_modules/jsoneditor/dist/jsoneditor.min.js";
const fs =require('fs');
import newFile from '../storage/newFileTemplate.json';
import JSONEditor from 'jsoneditor';
const dialog = require('electron').remote.dialog;
import Button from '@material-ui/core/Button';
import MyDialog from './Dialog';
import TransformIcon from '@material-ui/icons/Transform';

const useStyles = makeStyles((theme)=>({
  root: {
    // width: 500,
    height:50,
    backgroundColor: "#99ff99",
    width: '100%',
    position: 'fixed',
    bottom: 0,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

// console.log(newFile);

export default function LabelBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('0');
  const [disp,setDisp] = React.useState(true);
  const [dialogInit,setDialogInit] = React.useState(true);
    console.log(props);
const handleChange = (event, newValue) => {
    setValue(newValue);
};

var editor,openFileName,parsedJson,data;

function initializeEditor()
{
  openFileName = "";
  editor = new JSONEditor(document.getElementById("jsonEditor"+props.id), {});
  // parsedJson;
//   if(choice)
if(props.mode==="new")
  editor.set(newFile);
  else
  openFile(props.path);
}

function openFile(path){
//   dialog.showOpenDialog(require('electron').remote.BrowserWindow, {
//     properties: ['openFile', 'openDirectory']
//   }).then(result => {
    readFile(path)
    openFileName=path;
    console.log(path);
//   }).catch(err => {
//     console.log(err)
//   })
}

function writeFile(fileName){
  fs.writeFile(fileName, data, function (err) {
    if(err){
      alert("An error occurred creating the file " + err.message);
  }
  else{
    console.log("save");
  }
  });
}

function saveFile() {
  parsedJson = editor.get();
  data = JSON.stringify(parsedJson, null, 2);
  console.log(data);
  if (openFileName == "")
  {
    dialog.showSaveDialog(require('electron').remote.BrowserWindow, {
    }).then(result => {
      writeFile(result.filePath);
      console.log(result.filePath)
    }).catch(err => {
      console.log(err)
    })
  }
  else
  {
    writeFile(openFileName);
  }
}

function readFile(filepath){
  fs.readFile(filepath, 'utf-8', function (err, data) {
    if (err){
	  alert("An error occurred reading the file: " + err.message);
	  return;
	}
	console.log(data);
  parsedJson = JSON.parse(data);
  document.getElementById("jsonEditor"+props.id).innerHTML=""
  editor = new JSONEditor(document.getElementById("jsonEditor"+props.id), {});
	editor.set(parsedJson);
  });
}
useEffect(()=>initializeEditor());

return (
    
    <div>
      <div id={"container"+props.id} className="container">
			  <div id={"jsonEditor"+props.id} className="jsonEditor"></div>
			  <pre id={"jsonViewer"+props.id} className="jsonViewer">
			  	{!disp && <pre id={"tag"+props.id}>Click on <TransformIcon /> to see the JSON tree!</pre>}
			  </pre>	
		  </div>
      
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
          {/* <BottomNavigationAction label="New " value="new" icon={<FiberNewIcon />} onClick={()=>{setDialogNew(true)}}/> */}
          {/* <BottomNavigationAction label="Open" value="open" icon={<FolderOpenIcon />} onClick={()=>{openFile()}} /> */}
          <BottomNavigationAction label="Save" value="save" icon={<SaveIcon />} onClick={()=>{saveFile()}} />
          <BottomNavigationAction label="Transform" value="transform" icon={<TransformIcon />} onClick={()=>{console.log(editor.get());document.getElementById("jsonViewer"+props.id).innerHTML=JSON.stringify(editor.get(), null, 2);}} />
          {/* <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} onClick={()=>setDialogDisp(true)}/> */}
        </BottomNavigation> 
            
        {/* {dialogInit && <MyDialog message="Do you want to load a basic template or just a blank editor?"
                heading="Initialising Editor!"
                positive="Yeah! Load template"
                negative="No! "
                reply={(ans)=>{if(ans){initializeEditor(true)}else{initializeEditor(false)};setDisp(false);setDialogInit(false);}} />} */}
        {/* {(props.mode=="open")?{setDialogInit(true);}:{initializeEditor(false)}} */}
        {/* {setDialogInit(props.mode==="new"?true:false)} */}
        {/* {props.mode==="open"?initializeEditor(false):{}} */}
        {/* {props.mode==="open"?openFile(props.path):{}} */}
        {/* {initializeEditor} */}
    </div>
  );
}

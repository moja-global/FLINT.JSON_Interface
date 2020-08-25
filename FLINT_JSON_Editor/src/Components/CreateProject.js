import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles,createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
const fs = require("fs");
import jsonw from '../storage/packages_metadata.json';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import Input from '@material-ui/core/Input';
const { dialog } = require('electron').remote;
import {remote} from 'electron';
const path = require('path');
import MyDialog from './Dialog';
import {ToggleEditorEntry, EditorEntryFiles} from './ContextManager';
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 900,
    // height: 1000,
    // backgroundColor:'#ebebe0'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  // root: {
  //   '& > *': {
  //     margin: theme.spacing(1),
  //   },
  // },
}));

function getPath(json_value){
  console.log("aa")
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(result => {
    // console.log(result.canceled)
    // console.log(result.filePaths)
    if(result.canceled)
    {
      dialog.showErrorBox("Path Error", "You haven't chosen a Path! Press OK to continue!");
      return;
    }
    document.getElementById("projectPath").value=result.filePaths+"/"+json_value
    // ReactDOM.render(<Input id="projectPath" style={{width:"500px"}} value={result.filePaths+"/"+json_value} disabled inputProps={{ 'aria-label': 'description' }} />,document.getElementById("path_input"));
  }).catch(err => {
    console.log(err)
  })
}



export default function TitlebarGridList() {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState(false);
  const [dialogDisp,setDialogDisp] = React.useState(false);
  const [propFiles,setPropFiles] = React.useContext(EditorEntryFiles);
  const [dispEditorEntry, setDispEditorEntry] = React.useContext(ToggleEditorEntry);

  const handleChange = (event) => {
    // console.log(selectedValue);
    setSelectedValue(event.target.value);
    // console.log(event.target.value);
  };

  function createProject(selectedPath)
{
  console.log("create proj");
  var temp=[],temp1=[];//temp1 is for filenames and temp is for the whole path
  fs.mkdir(document.getElementById("projectPath").value, { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(path.join(remote.app.getAppPath(),'.webpack/renderer/main_window','/src/storage/templates/') +selectedPath,(err,files)=>{
      if(err) throw err; 
      // console.log(files);
      for(var i in files)
      {
        fs.copyFile(path.join(remote.app.getAppPath(),'.webpack/renderer/main_window','/src/storage/templates/') + selectedPath +'/' + files[i],document.getElementById("projectPath").value+"/"+files[i],(err)=>{console.log(err)});
        temp1.push(files[i]);
        temp.push(document.getElementById("projectPath").value+"/"+files[i]);
      }
      dialog.showMessageBox({
        type: "info",
        title: "Success",
        message: "Your project has been created",
        buttons: ["OK"]
      }).then(result=>{
        dialog.showMessageBox({
          type: "question",
          title: "Open Project",
          message: "Do you want to open the project",
          buttons: ["Cancel", "Yes"]
        }).then(res=>{
          if(res.response==1)
          {
            // console.log(temp1);console.log(temp);
            setPropFiles({files: temp1, directory: temp});setDispEditorEntry(true);
          }
        })
      });
    });
  });
}

  var temp=[];
  var i=0;
  for (var x in jsonw)
  {
    var list=[];
    jsonw[x]["files"].forEach(file=>{list.push(<li>{file}</li>)})
  
    temp.push(<GridListTile style={{padding: "20px"}}>
      <pre style={{backgroundColor:'#ebebe0',height:"300"}}>
      {x}
      <ul type="disc">
        {list}
      </ul>
    </pre>
    <Tooltip title={jsonw[x]["description"]} aria-label="JSON">
    <GridListTileBar
      title={x}
      subtitle={<span>{jsonw[x]["description"]}</span>}
      actionIcon={
      <Radio
        checked={selectedValue === x}
        onChange={handleChange}
        value={x}
        name="radio-button-demo"
        inputProps={{ 'aria-label': x }}
        />
      }
    />
    </Tooltip>
  </GridListTile>);
  i++;
  }

React.useEffect(()=>{if(selectedValue)ReactDOM.render(<ThemeProvider theme={theme}>
  <Button id="next_btn" variant="contained" color="primary" className={classes.margin} style={{float: "right"}} onClick={()=>{if(document.getElementById("projectPath").value)setDialogDisp(true);else dialog.showErrorBox("Path Error", "You haven't chosen a Path! Press OK to continue!");}} >Next</Button>
</ThemeProvider>,document.getElementById("buttonContainer"))},[selectedValue])

  return (
    <div className={classes.root}>
      <div style={{display:"inline-flex"}}>
        <form className={classes.root} noValidate autoComplete="off" id="path_input">
          <Input id="projectPath" style={{width:"400px"}} placeholder="Please Choose a Path to save your project" disabled inputProps={{ 'aria-label': 'description' }} />
        </form>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" className={classes.margin} onClick={()=>{if(selectedValue)getPath(selectedValue);else dialog.showErrorBox("Choose Project","Please choose a project from our catalog to proceed!");}}>
            Choose Path
          </Button>
        </ThemeProvider>
      </div>

      <GridList cellHeight={350} className={classes.gridList}  >
        {temp}
      </GridList>

      {dialogDisp && <MyDialog message={"Are you sure you want to create "+ selectedValue+"?"}
                heading="Confirmation for Project"
                positive="Yes"
                negative="Cancel"
                reply={(ans)=>{if(ans){createProject(selectedValue);};setDialogDisp(false)}} />}
    </div>
  );
}

import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles,createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
const folder = "./src/storage/templates/";
const fs = require("fs");
import jsonw from '../storage/packages_metadata.json';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import Input from '@material-ui/core/Input';
const { dialog } = require('electron').remote;
import MyDialog from './Dialog';
import SnackBar from './SnackBar';

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
    width: 600,
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
    console.log(result.canceled)
    console.log(result.filePaths)
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

function createProject()
{
  console.log("create proj");
}
export default function TitlebarGridList() {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState(false);
  const [dialogDisp,setDialogDisp] = React.useState(false);
  const [SnackDisp, setSnackDisp] = React.useState(false);

  const handleChange = (event) => {
    console.log(selectedValue);
    setSelectedValue(event.target.value);
    console.log(event.target.value);
  };

  var temp=[];
  var i=0;
  for (var x in jsonw)
  {
    var list=[];
    jsonw[x]["files"].forEach(file=>{list.push(<li>{file}</li>)})
  
    temp.push(<GridListTile style={{padding: "20px"}}>
      <pre style={{backgroundColor:'#ebebe0',height:"120px"}}>
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

// React.useEffect(()=>{ReactDOM.render(<ThemeProvider theme={theme}>
//   <Button id="next_btn" variant="contained"  className={classes.margin} style={{float: "right"}} onClick={()=>{if(document.getElementById("projectPath").value)setDialogDisp(true);else setSnackDisp(true)}} >Next</Button>
// </ThemeProvider>,document.getElementById("buttonContainer"))});

React.useEffect(()=>{if(selectedValue)ReactDOM.render(<ThemeProvider theme={theme}>
  <Button id="next_btn" variant="contained" color="primary" className={classes.margin} style={{float: "right"}} onClick={()=>{if(document.getElementById("projectPath").value)setDialogDisp(true);else setSnackDisp(true)}} >Next</Button>
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

      <GridList cellHeight={300} className={classes.gridList}  >
        {temp}
      </GridList>

      {dialogDisp && <MyDialog message={"Are you sure you want to create "+ selectedValue+"?"}
                heading="Confirmation for Project"
                positive="Yes"
                negative="Cancel"
                reply={(ans)=>{if(ans){createProject();};setDialogDisp(false)}} />}
      
      { SnackDisp && <SnackBar message="Please choose an option!" onComplete={()=>{setSnackDisp(false);console.log("sna")}}/>}

    </div>
  );
}

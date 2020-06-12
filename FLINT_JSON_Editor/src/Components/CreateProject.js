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
    ReactDOM.render(<Input style={{width:"500px"}} value={result.filePaths+"/"+json_value} disabled inputProps={{ 'aria-label': 'description' }} />,document.getElementById("path_input"));
  }).catch(err => {
    console.log(err)
  })
}

export default function TitlebarGridList() {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState(false);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value);
  };
{
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
}

  return (
    <div className={classes.root}>
      <div style={{display:"inline-flex"}}>
        <form className={classes.root} noValidate autoComplete="off" id="path_input">
          {/* <Input style={{width:"400px"}} value="" disabled inputProps={{ 'aria-label': 'description' }} /> */}
        </form>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" className={classes.margin} onClick={()=>{getPath(selectedValue);}}>
            Choose Path
          </Button>
        </ThemeProvider>
      </div>

      <GridList cellHeight={300} className={classes.gridList}  >
        {temp}
      </GridList>
    </div>
  );
}

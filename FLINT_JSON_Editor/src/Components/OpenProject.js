import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
const {dialog} = require('electron').remote;
const {basename} = require('path');
import Tooltip from '@material-ui/core/Tooltip';
const fs = require("fs");
import ReactDOM from 'react-dom';
import {ToggleEditorEntry, EditorEntryFiles} from './ContextManager';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  margin: {
    margin: theme.spacing(1),
    marginLeft: "40%",
  },
}));

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
});

export default function ChipsArray(props) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    // { key: 0, label: 'Angular' },
    // { key: 1, label: 'jQuery' },
    // { key: 2, label: 'Polymer' },
    // { key: 3, label: 'React' },
    // { key: 4, label: 'Vue.js' },
  ]);
  const [propFiles,setPropFiles] = React.useContext(EditorEntryFiles);
  const [dispEditorEntry, setDispEditorEntry] = React.useContext(ToggleEditorEntry);
  
  // console.log(chipData);
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  React.useEffect(()=>{
    var temp=[],temp1=[];
    for(var i=0;i<chipData.length;i++)
    {
      temp1.push(basename(chipData[i]));
      temp.push((chipData[i]));
    }
    if(chipData.length>0)
    renderBtn(temp,temp1);
  },[chipData])

  function selectFiles() {
    dialog.showOpenDialog({
        properties: ['openDirectory']
      }).then(result => {
        console.log(result);
        console.log(result.canceled)
        console.log(result.filePaths)
        fs.readdir(result.filePaths[0],(err,files)=>{
            var temp=[],temp1=[];//temp1 is for filenames and temp is for the whole path
            for(var i in files)
            {
              temp.push(result.filePaths+"/"+files[i]);
              temp1.push(files[i]);
            }
            setChipData([...new Set(chipData.concat(temp))]);
            // console.log(chipData);
            // renderBtn(temp,temp1);
            // setDisp(true);
            // ReactDOM.render(<ThemeProvider theme={theme}>
            //   <Button id="next_btn" variant="contained" color="primary" className={classes.margin} style={{float: "right"}} onClick={()=>{setPropFiles({files: temp1,directory: temp});setDispEditorEntry(true);console.log(dispEditorEntry)}} >Next</Button>
            // </ThemeProvider>,document.getElementById("buttonContainer"));
        });
      }).catch(err => {
        console.log(err)
      })
    }

  function renderBtn(temp, temp1)
  {
    // console.log(temp);
    // console.log(temp1);
    const tempObj={...propFiles};

    if(tempObj["files"]==undefined)
    {
      tempObj["files"]=[];
      tempObj["directory"]=[];
    }
    
    tempObj["files"]=tempObj["files"].concat(temp1);
    tempObj["directory"]=tempObj["directory"].concat(temp);
    ReactDOM.render(<ThemeProvider theme={theme}>
      <Button id="next_btn" variant="contained" color="primary" className={classes.margin} style={{float: "right"}} onClick={()=>{setPropFiles(tempObj);setDispEditorEntry(true);console.log(dispEditorEntry)}} >Next</Button>
    </ThemeProvider>,document.getElementById("buttonContainer"));
  }

  return (
    <div>
        <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary" className={classes.margin} onClick={()=>{selectFiles()}}>Select Project</Button>
        </ThemeProvider>
        <Paper component="ul" className={classes.root}>
        { chipData.map((data) => {
            return (
            <li>
              <Tooltip title={data}>
                <Chip
                label={basename(data)}
                onDelete={handleDelete(data)}
                className={classes.chip}
                />
              </Tooltip>
            </li>
            );
        })}
        </Paper>
    </div>
  );
}

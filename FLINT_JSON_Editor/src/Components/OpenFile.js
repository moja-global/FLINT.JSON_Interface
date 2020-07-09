import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
const {dialog} = require('electron').remote;
const {basename} = require('path');
import Tooltip from '@material-ui/core/Tooltip';
import ReactDOM from 'react-dom';

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
  
  console.log(chipData);
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  function selectFiles() {
    dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections']
      }).then(result => {
        console.log(result);
        console.log(result.canceled)
        console.log(result.filePaths)
        var temp=[],temp1=[];//temp1 is for filenames and temp is for the whole path
        for(var i in result.filePaths)
        {
          temp1.push(basename(result.filePaths[i]));
          temp.push(result.filePaths[i]);
        }
        setChipData([...new Set(chipData.concat(temp))]);
        console.log(chipData);
        ReactDOM.render(<ThemeProvider theme={theme}>
          <Button id="next_btn" variant="contained" color="primary" className={classes.margin} style={{float: "right"}} onClick={()=>{props.onHome(temp,temp1)}} >Next</Button>
        </ThemeProvider>,document.getElementById("buttonContainer"));
        // setDisp(true);
      }).catch(err => {
        console.log(err)
      })
    }

  return (
    <div>
        <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary" className={classes.margin} onClick={()=>{selectFiles()}}>Select Files</Button>
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

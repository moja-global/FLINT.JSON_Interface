import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
const {dialog} = require('electron').remote;

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

export default function ChipsArray() {
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
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  function selectFiles() {
    dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections']
      }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
        var temp=[];
        for(var i in result.filePaths)
        {
            // setChipData([...chipData.concat({key: i,label: result.filePaths[i]})])
            temp.push(result.filePaths[i]);
        }
        setChipData([...new Set(chipData.concat(temp))]);
        console.log(chipData);
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
                <Chip
                label={data}
                onDelete={handleDelete(data)}
                className={classes.chip}
                />
            </li>
            );
        })}
        </Paper>
    </div>
  );
}

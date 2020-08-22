import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';  
import Input from '@material-ui/core/Input';
import { green } from '@material-ui/core/colors';
const { dialog } = require('electron').remote;
import {remote} from 'electron';
const Path=require('path');
const fs = require("fs");

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    // width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

 function getPath(choice,classes, files){
  if(choice && document.getElementById("projectName").value=="")
    {
      dialog.showErrorBox("Project Error", "You haven't chosen a Project Name! Press OK to continue!");
      return;
    }
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
    console.log(result.filePaths[0]);
    if(choice)
    document.getElementById("path").value=result.filePaths[0]+"/"+document.getElementById("projectName").value;
    else
    document.getElementById("path").value=result.filePaths[0];
    ReactDOM.render(<ThemeProvider theme={theme}>
      <Button id="next_btn" variant="contained" color="primary" className={classes.margin} style={{float: "right"}} onClick={()=>{copyFiles(files, choice)}} >Next</Button>
    </ThemeProvider>,document.getElementById("buttonContainer"));
    // document.getElementById("next_btn").setAttribute("onClick","console.log('aaaa')");
    // handleNextChange();
  }).catch(err => {
    console.log(err)
  })
}

function copyFiles(files, choice)
{
  var s=[];
  for(var i in files)
  {
    s+="config="+files[i]+"\n";
  }
  var path = document.getElementById("path").value;
  fs.mkdir(path, { recursive: true }, (err) => {
    if(err) throwerr;
  });

  if(choice)
  {
    for(var i in files)
    {
      fs.copyFile(Path.join(remote.app.getAppPath(),'.webpack/renderer/main_window','/src/storage/templates/files/')+files[i], path+'/'+files[i], (err) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
      });
    }
    fs.writeFile(path + '/gcbm_config.cfg', s, (err) => {
      if (err) throw err;
    });
  }
  else
  {
    fs.writeFile(path + '/gcbm_config.cfg', s, (err) => {
      if (err) throw err;
    });
  }

  dialog.showMessageBox({
    type: "info",
    title: "Success",
    message: "Your CFG file has been created",
    buttons: ["OK"]
  });
}

export default function TransferList() {
  var peatland_JSON = [
    'peatland_modules.json', 'standard_gcbm_modules.json',
    'peatland_output_modules.json', 'standard_gcbm_pools.json',
    'peatland_pools.json', 'standard_gcbm_provider_config.json',
    'peatland_variables.json', 'standard_gcbm_spinup.json',
    'standard_gcbm_internal_variables.json', 'standard_gcbm_variables.json',
    'standard_gcbm_localdomain.json'
  ];
  
  var standard_JSON = [
    'standard_gcbm_internal_variables.json', 'standard_gcbm_pools.json',
    'standard_gcbm_localdomain.json', 'standard_gcbm_provider_config.json',
    'standard_gcbm_modules.json', 'standard_gcbm_spinup.json',
    'standard_gcbm_output_modules.json', 'standard_gcbm_variables.json'
  ];
  
  var a_n_partitioning_JSON = [
    'a_n_partitioning_internal_variables.json', 'standard_gcbm_output_modules.json',
    'a_n_partitioning_modules.json', 'standard_gcbm_pools.json',
    'a_n_partitioning_variables.json', 'standard_gcbm_provider_config.json',
    'standard_gcbm_internal_variables.json', 'standard_gcbm_spinup.json',
    'standard_gcbm_localdomain.json', 'standard_gcbm_variables.json',
    'standard_gcbm_modules.json'
  ];
  
  var JSON_array = [...new Set(standard_JSON.concat(a_n_partitioning_JSON).concat(peatland_JSON))];
  
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(JSON_array);
  const [right, setRight] = React.useState([]);
  const [choice, setChoice] = React.useState(false);
  // React.useEffect(()=>{document.getElementById("next_btn").style.backgroundColor="#4caf50";document.getElementById("next_btn").style.color="rgba(0, 0, 0, 0.87)"})

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  function handleSwitchChange(){
    setChoice(!choice);
    document.getElementById("path").value="";
  }

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />

            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <div>
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid xs={5} item>{customList('Choices', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid xs={5} item>{customList('Chosen', right)}</Grid>
    </Grid>

    <FormGroup style={{marginLeft: "40%"}}>
        <FormControlLabel 
          control={<Switch checked={choice} onChange={()=>{handleSwitchChange()}} />}
          label="Create Project along with CFG File!"
        />
    </FormGroup>
    <div style={{display:"inline-flex",marginLeft: "20%"}}>
        <form className={classes.root} noValidate autoComplete="off" id="path_input">
          {choice && <Input id="projectName" placeholder="Project Name" inputProps={{ 'aria-label': 'description' }} />}
          <Input id="path" style={{width:"400px"}} placeholder="Please Choose a Path to save your project" disabled inputProps={{ 'aria-label': 'description' }} />
        </form>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" className={classes.margin} onClick={()=>{getPath(choice,classes, right);}}>
            Choose Path
          </Button>
        </ThemeProvider>
    </div>
  </div>
  );
}

import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
const folder = "./src/storage/templates/";
const fs = require("fs");
import jsonw from '../storage/packages_metadata.json';

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
}));

export default function TitlebarGridList() {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
{
  var temp=[];
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
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'A' }}
        />
      }
    />
    </Tooltip>
  </GridListTile>)}
}

  return (
    <div className={classes.root}>
      {/* {abc} */}
      <button onClick={()=>readdir1()}>fff</button>
      <GridList cellHeight={300} className={classes.gridList}  >
        {temp}
          <GridListTile style={{padding: "20px"}}>
          <pre style={{backgroundColor:'#ebebe0',height:"120px"}}>
            Standard GCBM Project:
              <ul type="disc">
                <li>variables.json</li>
                <li>localdomain.json</li>
                <li>modules.json</li>
              </ul>
            </pre>
            <Tooltip title="Helps to create a project consisting of files specific to a standard GCBM Project" aria-label="JSON">
            <GridListTileBar
              title="Standard GCBM Project"
              subtitle={<span>Helps to create a project consisting of files specific to a standard GCBM Project</span>}
              actionIcon={
              <Radio
                checked={selectedValue === 'a'}
                onChange={handleChange}
                value="a"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'A' }}
                />
              }
            />
            </Tooltip>
          </GridListTile>
          <GridListTile style={{padding: "20px"}}>
            <pre style={{backgroundColor:'#ebebe0',height: "120px"}}>
              GCBM + Peatland project:
              <ul type="disc">
                <li>localdomain.json</li>
                <li>gcbm_variables.json</li>
                <li>gcbm_modules.json</li>
                <li>peatland_variables.json</li>
                <li>peatland_modules.json</li>
              </ul>
            </pre>
            <Tooltip title="Helps to create a project consisting of files specific to a standard GCBM and Peatland Project" aria-label="JSON">
            <GridListTileBar
              title="GCBM + Peatland Project"
              subtitle={<span>Helps to create a project consisting of files specific to a standard GCBM and Peatland Project</span>}
              actionIcon={
                <Radio
                  checked={selectedValue === 'b'}
                  onChange={handleChange}
                  value="b"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'B' }}
                />
              }
            />
            </Tooltip>
          </GridListTile>

          <GridListTile style={{padding: "20px"}}>
          <pre style={{backgroundColor:'#ebebe0',height:"120px"}}>
              GCBM + Peatland project:
              <ul type="disc">
                <li>localdomain.json</li>
                <li>gcbm_variables.json</li>
                <li>gcbm_modules.json</li>
                <li>peatland_variables.json</li>
                <li>peatland_modules.json</li>
              </ul>
            </pre>
            <Tooltip title="Helps to create a project consisting of files specific to a standard GCBM and Peatland Project" aria-label="JSON">
            <GridListTileBar
              title="GCBM + Peatland Project"
              subtitle={<span>Helps to create a project consisting of files specific to a standard GCBM and Peatland Project</span>}
              actionIcon={
                <Radio
                  checked={selectedValue === 'c'}
                  onChange={handleChange}
                  value="c"
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'C' }}
                />
              }
            />
            </Tooltip>
          </GridListTile>
      </GridList>
    </div>
  );
}

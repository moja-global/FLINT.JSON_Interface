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
  const [selectedValue, setSelectedValue] = React.useState(0);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
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
        checked={selectedValue === i.toString()}
        onChange={handleChange}
        value={i.toString()}
        name="radio-button-demo"
        inputProps={{ 'aria-label': i.toString() }}
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
      <GridList cellHeight={300} className={classes.gridList}  >
        {temp}
      </GridList>
    </div>
  );
}

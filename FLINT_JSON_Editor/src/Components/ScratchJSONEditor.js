import React from 'react';
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
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    // width: 500,
    height:50,
    backgroundColor: "#99ff99",
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

export default function LabelBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('0');
let history=useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div id="container">
			  <div id="jsonEditor"></div>
			  <pre id="jsonViewer">
			  	<pre id="tag">Click here to see the JSON tree!</pre>
			  </pre>	
		  </div>
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction label="New " value="new" icon={<FiberNewIcon />} />
        <BottomNavigationAction label="Open" value="open" icon={<FolderOpenIcon />} />
        <BottomNavigationAction label="Save" value="save" icon={<SaveIcon />} />
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} onClick={()=>{props.onHome(true);history.goBack()}} />
      </BottomNavigation>
    </div>
  );
}

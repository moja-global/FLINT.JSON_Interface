import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CreateJSON from './CreateJSON';
import CreateProject from './CreateProject';
import CreateCFG from './CreateCFG';
import OpenProject from './OpenProject';
import OpenFile from './OpenFile';
import { createMuiTheme, withStyles,  ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import SwipeableViews from 'react-swipeable-views';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  margin: {
    margin: theme.spacing(1),
  },
  container :{

  }
}));

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  
  return (
    <div className={classes.root} >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        //   centered
        >
          <Tab label="Create Project from Predefined package" {...a11yProps(0)} />
          <Tab label="Create JSON File" {...a11yProps(1)} />
          <Tab label="Create CFG File" {...a11yProps(2)} />
          <Tab label="Open Project" {...a11yProps(3)} />
          <Tab label="Open Files" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{height: "25vw"}}>
        <TabPanel value={value} index={0}>
          <CreateProject />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CreateJSON onRadioChange={(val)=>{console.log("StartupWizard#"+val);props.onRadioChange2(val)}}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CreateCFG />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <OpenProject />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <OpenFile />
        </TabPanel>
     </SwipeableViews>
     
      
        {/* <CreateJSON /> */}
      
      {/* <div id="button" style={{float: "right"}}>
          <ThemeProvider theme={theme}>
              <Button variant="contained" color="primary" className={classes.margin}>Next ></Button>
          </ThemeProvider>
      </div> */}
    </div>
    
  );
}

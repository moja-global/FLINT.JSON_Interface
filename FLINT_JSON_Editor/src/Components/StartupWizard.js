import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CreateJSON from './CreateJSON';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       '& > *': {
//         margin: theme.spacing(1),
//         width: theme.spacing(16),
//         height: theme.spacing(16),
//       },
//     },
// }));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
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
    // display: 'flex',
    //   flexWrap: 'wrap',
    //   '& > *': {
    //     margin: theme.spacing(1),
    //     width: theme.spacing(100),
    //     height: theme.spacing(100),
    // },
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        {/* <Paper elevation={3}> */}
        {/* <Container > */}
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
      </AppBar><Container>
      <TabPanel value={value} index={0}>
        {/* <CreateJSON /> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateJSON />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <CreateJSON /> */}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {/* <CreateJSON /> */}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {/* <CreateJSON /> */}
      </TabPanel>
      </Container>
      {/* </Paper> */}
    </div>
  );
}

import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import Tabs from "react-draggable-tabs";
import ScratchJSoNEditor from './ScratchEditor';
const fs = require("fs");
import MyDialog from './Dialog';
const {dialog} = require('electron').remote;
const {basename} = require('path');
import Variables from './Forms/variables';
import LocalDomain from './Forms/localdomain';
import Pools from './Forms/pools';
import Modules from './Forms/modules';
import Peatland from './Forms/peatland_output_modules';
import { Titlebar, Color } from 'custom-electron-titlebar'
import { WebContents } from 'electron';
// new Titlebar({
// 	backgroundColor: Color.fromHex('#ECECEC')
// });

export default function EditorEntry(props) {
  // const classes = useStyles();
  // props={
  //   files: ["standard_gcbm_variables.json","standard1.json","standard_gcbm_spinup.json","standard.json"],
  //   directory:["/home/abhishek/Desktop/standard_gcbm_JSON/standard_gcbm_variables.json","/home/abhishek/Desktop/standard1.json","/home/abhishek/Desktop/standard_gcbm_JSON/standard_gcbm_spinup.json","/home/abhishek/Desktop/standard.json"]
  // };

  const [tabs,setTabs] = React.useState([]);

var map=new Map();
const [view,setView] = React.useState(false);
const [dialogDisp, setdialogDisp] = React.useState(false);
const [notFound, setNotFound] = React.useState([]);
const [showTab, setShowTab] = React.useState(false);
const [newTab, setNewTab] = React.useState(0);
const [tabBody, setTabBody] = React.useState([]);
var countTabs=0;
var theme=React.createContext({disp: true,changeDisp:()=>{disp=false;}});
console.log(React.useContext(theme).disp);

setTimeout(()=>{theme.changeDisp;},5000)
fs.readdir('src/storage/templates/files',(err,files)=>{
  if(err) throw err;
  // console.log(files);
  for(var i=0;i<files.length;i++)
    map.set(files[i],true);
  for(var i=0;i<props.files.length;i++)
    if(!(map.get(props.files[i])))
      notFound.push(props.files[i]);
  // console.log(notFound.length==0);
  setdialogDisp(true);
});

function fetchComp(file, directory)
{
  const data= JSON.parse(fs.readFileSync(directory, "utf8"));
  console.log(data);
  if(file=="standard_gcbm_localdomain.json")
  return <LocalDomain json={data} />;
  else if(file=="peatland_variables.json"||file=="standard_gcbm_variables.json"||file=="a_n_partitioning_variables.json"||file=="standard_gcbm_internal_variables.json"||file=="a_n_partitioning_internal_variables.json")
  return <Variables json={data} />;
  else if(file=="peatland_modules.json"||file=="standard_gcbm_modules.json"||file=="a_n_partitioning_modules.json"||file=="standard_gcbm_output_modules.json")
  return <Modules json={data} />;
  else if(file=="peatland_pools.json"||file=="standard_gcbm_pools.json")
  return <Pools json={data} />;
  else if(file=="peatland_output_modules.json")
  return <Peatland json={data} />
}
function initiateTabs(ans)
{
  var temp=[];
  for(var i=0;i<props.files.length;i++)
  {
    tabs.push({
      id: i,
      content: props.files[i],
      active: i==0 ? true : false,
      display: "",
      tabBody: i
    });
    // console.log(tabs);
    // addTab(props.files[i]);
    if(map.get(props.files[i]))
      temp.push(<div id={"tab"+countTabs} style={i==0?{display: "block"}:{display: "none"}}>{ans ? fetchComp(props.files[i],props.directory[i]):<ScratchJSoNEditor Editor="true" path={props.directory[i]} mode="open" id={i} />}</div>);
    else
      temp.push(<div id={"tab"+countTabs} style={i==0?{display: "block"}:{display: "none"}}>{<ScratchJSoNEditor Editor="true" path={props.directory[i]} mode="open" id={i} />}</div>);
    // setCountTabs(countTabs+1);
    countTabs+=1;
  }
  // ReactDOM.render(temp,document.getElementById("TabContainer"));
  setTabBody(temp);
  setShowTab(true);
  setNewTab(countTabs);
  // console.log(map);
}

function displayTab(num)
{
  var divs=document.getElementById("TabContainer").getElementsByTagName("div");
  for(var i=0;i<divs.length;i++)
  {
    document.getElementById("tab"+i).style.display=(num==i?"block":"none");
    if(num==i){const titlebar=new Titlebar();titlebar.updateTitle(props.directory[i]+",FLINT");
    titlebar.dispose();}
  }
}

function moveTab(dragIndex, hoverIndex) {
  let newTabs = [...tabs];
  newTabs.splice(hoverIndex, 0, newTabs.splice(dragIndex, 1)[0]);
  setTabs(newTabs);
}

function selectTab(selectedIndex, selectedID) {
  // console.log("se "+selectedID);
  const newTabs = tabs.map(tab => ({
    ...tab,
    active: tab.id === selectedID
  }));
  setTabs(newTabs);
  displayTab(selectedID);
}

function closedTab(removedIndex, removedID) {
  let newTabs = [...tabs];
  // console.log(removedIndex);
      var temp=newTabs.splice(removedIndex, 1);
      document.getElementById("tab"+temp[0].tabBody).style.display="none";
      console.log(temp[0].tabBody);
      console.log(temp);
      if (tabs[removedIndex].active && newTabs.length !== 0) { // automatically select another tab if needed
          const newActive = (removedIndex === 0 ? 0: removedIndex - 1);
          newTabs[newActive].active = true;
          console.log(newTabs[newActive].tabBody);
          // document.getElementById("tab"+temp[0].id).style.display="none";
          document.getElementById("tab"+newTabs[newActive].tabBody).style.display="block";
          console.log(newActive);
      }
  setTabs(newTabs);
}

function addTab(){
  
  dialog.showOpenDialog({
    properties: ['openFile']
  }).then(result => {
  //   console.log(result.canceled)
  //   console.log(result.filePaths)
    let newTabs = [...tabs];
      newTabs.push({
          id: newTab,
          content: basename(result.filePaths[0]),
          display: "",
          active: newTabs.length==0 ? true : false,
          tabBody: newTab
      })
    setTabs(newTabs);

    <MyDialog message="Choose a type of operation"
                heading="New Tab"
                positive="Open File"
                negative="Create New File"
                reply={(ans)=>{ans?
                  setTabBody([...tabBody, 
                  <div id={"tab"+newTab} style={newTabs.length==1 ? {display: "block"}:{display: "none"}}>{map.get(basename(result.filePaths[0]))?fetchComp(basename(result.filePaths[0]),result.filePaths[0]):<ScratchJSoNEditor Editor="true" path={props.directory[i]} mode="open" />}</div>
                  ])
                :
                setTabBody([...tabBody, 
                  <div id={"tab"+newTab} style={newTabs.length==1 ? {display: "block"}:{display: "none"}}>{map.get(basename(result.filePaths[0]))?fetchComp(basename(result.filePaths[0]),result.filePaths[0]):<ScratchJSoNEditor Editor="true" path={props.directory[i]} mode="new" />}</div>
                  ])}} />  


    setTabBody([...tabBody, 
    <div id={"tab"+newTab} style={newTabs.length==1 ? {display: "block"}:{display: "none"}}>{map.get(basename(result.filePaths[0]))?fetchComp(basename(result.filePaths[0]),result.filePaths[0]):<ScratchJSoNEditor Editor="true" path="" mode="new" />}</div>
    ]);
    setNewTab(newTab+1);
    }).catch(err => {
      console.log(err)
  });
}

// const activeTab = tabs.filter(tab => tab.active === true);
console.log(tabs);
document.body.style.backgroundImage='none';

return (
    <div>
      {  React.useContext(theme).disp && <MyDialog message={notFound.length==0 ? "You have chosen "+props.files+" to open in the editor. Choose mode!" : "You have chosen "+props.files+" to open in the editor. Choose mode!(Templates for "+notFound+" were not found so they will be automatically opened in ScratchJSONEditor regardless of chosen option)" }
                heading="JSON Editor"
                positive="Template Editor"
                negative="Scratch JSON Editor!"
                reply={(ans)=>{initiateTabs(ans);}} />}
      { showTab && <Tabs moveTab={moveTab} selectTab={selectTab} closeTab={closedTab} tabs={tabs}>
        <button onClick={()=>{
          addTab()
          }}>+</button>
      </Tabs>}
      {/* {activeTab.length !== 0 ? activeTab[0].display : ""}  */}
      <div id="TabContainer">{tabBody}</div>
    </div>
  );
}

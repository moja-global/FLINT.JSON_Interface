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
import { WebContents, remote } from 'electron';
const { ipcRenderer } = require('electron');
const { Menu } = require('electron').remote;
const path=require('path');


const title=[...Menu.getApplicationMenu().items];
if(title[title.length-1].label=="Home")
{
  title.splice(title.length-2,2);
}
title.push({
  label: 'Save',
  accelerator: 'Ctrl+S',
  click: () => { ipcRenderer.send('title-message', 'ping') }
},
{
  label: 'Home',
  accelerator: 'Ctrl+Home',
  click: ()=> require('electron').remote.getCurrentWindow().reload()
});

const menu = Menu.buildFromTemplate(title);
Menu.setApplicationMenu(menu);

export default function EditorEntry(props) {

const [tabs,setTabs] = React.useState([]);

var map=new Map();
const [view,setView] = React.useState(false);
const [dialogDisp, setdialogDisp] = React.useState(false);
var notFound=[];
const [showTab, setShowTab] = React.useState(false);
const [newTab, setNewTab] = React.useState(0);
const [tabBodies, setTabBodies] = React.useState([]);
var countTabs=0;
var theme=React.createContext({disp: true,changeDisp:()=>{disp=false;}});

setTimeout(()=>{theme.changeDisp;},5000)
// fs.readdir(path.join(remote.app.getAppPath(),'.webpack/renderer/main_window/src/storage'),(err1,files1)=>{if(err1) throw err1;console.log(files1)});

fs.readdir(path.join(remote.app.getAppPath(),'.webpack/renderer/main_window','/src/storage/templates/files'),(err,files)=>{
  console.log(path.resolve(__dirname));
  // fs.readdir(path.resolve(__dirname),(err1,files1)=>{if(err1) throw err;console.log(files1)});
  if(err) throw err;
  // console.log(files);
  for(var i=0;i<files.length;i++)
    map.set(files[i],true);
  
  map.delete("standard_gcbm_internal_variables.json"); //delete this statement once the file's template is created
  map.delete("standard_gcbm_provider_config.json"); //delete this statement once the file's template is created
  map.delete("standard_gcbm_spinup.json"); //delete this statement once the file's template is created

  for(var i=0;i<props.files.length;i++)
    if(!(map.get(props.files[i])))
      notFound.push(props.files[i]);
  console.log(notFound);
  // console.log(notFound.length==0);
  setdialogDisp(true);
});

function fetchComp(file, directory)
{
  const data= JSON.parse(fs.readFileSync(directory, "utf8"));
  if(file=="standard_gcbm_localdomain.json")
  return <LocalDomain json={data} directory={directory} />;
  else if(file=="peatland_variables.json"||file=="standard_gcbm_variables.json"||file=="a_n_partitioning_variables.json"||file=="a_n_partitioning_internal_variables.json")
  return <Variables json={data} directory={directory} />;
  else if(file=="peatland_modules.json"||file=="standard_gcbm_modules.json"||file=="a_n_partitioning_modules.json")
  return <Modules json={data} directory={directory} />;
  else if(file=="peatland_pools.json"||file=="standard_gcbm_pools.json")
  return <Pools json={data} directory={directory} />;
  else if(file=="peatland_output_modules.json"||file=="standard_gcbm_output_modules.json")
  return <Peatland json={data} directory={directory} />
}

function initiateTabs(ans)
{
  console.log(ans);
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
      temp.push(<div id={"tab"+countTabs} className="bodyTabs" style={i==0?{display: "block"}:{display: "none"}}>{ans ? fetchComp(props.files[i],props.directory[i]):<ScratchJSoNEditor Editor="true" path={props.directory[i]} mode="open" id={i} />}</div>);
    else
      temp.push(<div id={"tab"+countTabs} className="bodyTabs" style={i==0?{display: "block"}:{display: "none"}}>{<ScratchJSoNEditor Editor="true" path={props.directory[i]} mode="open" id={i} />}</div>);
    // setCountTabs(countTabs+1);
    countTabs+=1;
    if(i==0)
    {
      const titlebar=new Titlebar();titlebar.updateTitle(props.directory[0]+" - FLINT JSON Editor");
      titlebar.dispose();
    }
  }
  // ReactDOM.render(temp,document.getElementById("TabContainer"));
  setTabBodies(temp);
  setShowTab(true);
  setNewTab(countTabs);
  // console.log(map);
}

function displayTab(num)
{
  var divs=document.getElementById("TabContainer").getElementsByClassName("bodyTabs");
  // console.log(divs.length);
  for(var i=0;i<divs.length;i++)
  {
    document.getElementById("tab"+i).style.display=(num==i?"block":"none");
    if(num==i){const titlebar=new Titlebar();titlebar.updateTitle(props.directory[i]+" - FLINT JSON Editor");
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
      var temp=newTabs.splice(removedIndex, 1);
      document.getElementById("tab"+temp[0].tabBody).style.display="none";
      if (tabs[removedIndex].active && newTabs.length !== 0) { // automatically select another tab if needed
          const newActive = (removedIndex === 0 ? 0: removedIndex - 1);
          newTabs[newActive].active = true;
          document.getElementById("tab"+newTabs[newActive].tabBody).style.display="block";
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
    props.directory.push(result.filePaths[0]);
    setTabBodies([...tabBodies, 
    <div id={"tab"+newTab} className="bodyTabs" style={newTabs.length==1 ? {display: "block"}:{display: "none"}}>{map.get(basename(result.filePaths[0]))?fetchComp(basename(result.filePaths[0]),result.filePaths[0]):<ScratchJSoNEditor Editor="true" path="" mode="new" />}</div>
    ]);
    setNewTab(newTab+1);
    }).catch(err => {
      console.log(err)
  });
}

// const activeTab = tabs.filter(tab => tab.active === true);
// console.log(tabs);
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
      <div id="TabContainer">{tabBodies}</div>
    </div>
  );
}

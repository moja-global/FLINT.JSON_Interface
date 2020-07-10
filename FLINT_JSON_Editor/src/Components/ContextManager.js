import React,{useState, useContext, createContext} from 'react';

export const ToggleEditorEntry = createContext();
export const EditorEntryFiles = createContext();
export const EditorEntryDirectory = createContext();

export const ToggleEditorEntryProvider = props => {
    const [disp,setDisp]=useState(false);
    return(
    <ToggleEditorEntry.Provider value={[disp,setDisp]}>{props.children}</ToggleEditorEntry.Provider>
    )
}

export const EditorEntryFilesProvider = props => {
    const [disp,setDisp]=useState({files:[],directory:[]});
    return(
    <EditorEntryFiles.Provider value={[disp,setDisp]}>{props.children}</EditorEntryFiles.Provider>
    )
}

export const EditorEntryDirectoryProvider = props => {
    const [disp,setDisp]=useState("");
    return(
    <EditorEntryDirectory.Provider value={[disp,setDisp]}>{props.children}</EditorEntryDirectory.Provider>
    )
}
import {memo, useState} from 'react'
import './App.css'
import {Provider, useSelector} from "react-redux";
import store from "./store";
import MusicContainer from "./musicContainer";

function App() {
  return (
      <Provider store={store}>

     <div className="flex justify-center flex-col items-center">
      <h2 className="title text-2xl"> Masoud music player</h2>
      <MusicContainer/>
    </div>
      </Provider>
  )
}

export default memo(App,()=>{
   return  false
})

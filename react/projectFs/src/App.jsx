import './App.css'
import React, { useEffect } from 'react'
import Layout from './components/Layout'
import { useSelector } from 'react-redux'
import {signIn} from './redux/reducers/UserReducer'
      

function App() {

  return (
    <>
    <Layout></Layout>
    </>
  )
}

export default App

import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Admin from './pages/Admin'
import './App.css'
import AddUsers from './pages/AddUsers'
import Dashboard from './pages/Dashboard'
import ProductList from './pages/ProductList'
import ViewProduct from './pages/ViewProduct'
import UserList from './pages/UserList'
import ViewUser from './pages/ViewUser'
import EditUser from './pages/EditUser'
import AddProduct from './pages/AddProduct'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/add-user" element={<AddUsers />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/products' element={<ProductList/>}/>
        <Route path='/products/:id' element={<ViewProduct/>}/>
        <Route path='/users' element={<UserList/>}/>
        <Route path='/users/:id' element={<ViewUser/>}/>
        <Route path = '/edit-user/:id' element={<EditUser/>}/>
        <Route path = '/add-product' element={<AddProduct/>}/>
      </Route>
    </Routes>
      
  )
}

export default App

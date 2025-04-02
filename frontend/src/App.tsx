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
import EditProduct from './pages/EditProduct'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='/' element={<Dashboard/>}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/add-user" element={<AddUsers />} />
        <Route path='/products' element={<ProductList/>}/>
        <Route path='/products/:id' element={<ViewProduct/>}/>
        <Route path='/users' element={<UserList/>}/>
        <Route path='/users/:id' element={<ViewUser/>}/>
        <Route path = '/edit-user/:id' element={<EditUser/>}/>
        <Route path = '/add-product' element={<AddProduct/>}/>
        <Route path = '/edit-product/:id' element={<EditProduct/>}/>
      </Route>
    </Routes>
      
  )
}

export default App

import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Book from "../pages/Book"
import Borrow from "../pages/Borrow"
import Category from "../pages/Category"
import Login from "../pages/Login"
import User from "../pages/User"
import AddBook from '../pages/Book/AddBook'
import AddBorrow from "../pages/Borrow/AddBorrow"
import AddCategory from "../pages/Category/AddCategory"
import EditCategory from '../pages/Category/EditCategory'
import AddUser from "../pages/User/AddUser"
import EditBook from "../pages/Book/EditBook"



const AppRouter = ()=>{
    return(
        <Router>
            <Routes>
                <Route path='/book' element={<Book/>}></Route>
                <Route path='/book/add' element={<AddBook/>}></Route>
                <Route path ='/book/edit/*' element={<EditBook/>}></Route>
                <Route path='/borrow' element={<Borrow/>}></Route>
                <Route path='/borrow/add' element={<AddBorrow/>}></Route>
                <Route path='/category' element={<Category/>}></Route>
                <Route path='/category/add' element={<AddCategory/>}></Route>
                <Route path='/category/edit/*' element={<EditCategory/>}></Route>
                <Route path='/Login' element={<Login/>}></Route>
                <Route path='/user' element={<User/>}></Route>
                <Route path='/user/*' element={<AddUser/>}></Route>
                <Route path='/*' element={<Login/>}></Route>
            </Routes>
        </Router>
    )
}


export default AppRouter


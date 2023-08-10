import MainAppBar from './components/AppBar/MainAppBar'
import './App.css'
import SignIn from './components/pages/SignIn'
import { useEffect, useState } from 'react'
import IAdmin from './interfaces/IAdmin'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import navLinks from './utils/NavLinks'
import AdminContext from './context/AdminContext'
import Products from './components/pages/Products/Products'
import NewProduct from './components/pages/Products/NewProduct/NewProduct'
import Categories from './components/pages/Categories/Categories'
import Category from './components/pages/Categories/Category'
import Subcategory from './components/pages/Subcategory/Subcategory'
import Props from './components/pages/Props/Props'
import PropDetails from './components/pages/Props/PropDetails'
import NewCategory from './components/pages/Categories/NewCategory'
import NewSubcategory from './components/pages/Subcategory/NewSubcategory'
import axios from 'axios'
import EditCategory from './components/pages/Categories/EditCategory'
import NewProp from './components/pages/Props/NewProp'
import EditProp from './components/pages/Props/EditProp'


const queryClient = new QueryClient()
export default function App() {
  const [admin, setAdmin] = useState<IAdmin | undefined>()
  axios.defaults.baseURL = "http://192.168.0.115:3000/api"
  axios.defaults.headers.common['Authorization'] = admin?.token

  useEffect(() => {
    const a = localStorage.getItem('admin');
    if (a !== 'undefined') {
      setAdmin(JSON.parse(a))
    }
  }, [])

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      <QueryClientProvider client={queryClient}>
        <div >

          {!admin ?
            <SignIn /> :
            <>
              <BrowserRouter>
                <MainAppBar setUser={setAdmin} navlinks={navLinks} />
                <Routes>
                  <Route exact={true} path="/" element={<Products />} />
                  <Route path="/products/new" element={<NewProduct />} />

                  <Route path='/props' element={<Props />}></Route>
                  <Route path='/props/new' element={<NewProp />}></Route>
                  <Route path='/props/:propId/values/new' element={<NewProp />}></Route>
                  <Route path="/props/edit/:propId" element={<EditProp />} />
                  <Route path="/props/:propId" element={<PropDetails />} />

                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/new" element={<NewCategory />} />
                  <Route path="/categories/edit/:id" element={<EditCategory />} />
                  <Route path="/categories/:id" element={<Category />} />
                  <Route path="/categories/:id/new" element={<NewSubcategory />} />
                  <Route path="/categories/:catId/subcategory/:subCtId" element={<Subcategory />} />
                </Routes>
              </BrowserRouter>
            </>}
        </div >
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AdminContext.Provider>

  )
} 

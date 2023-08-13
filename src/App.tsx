import MainAppBar from './components/AppBar/MainAppBar'
import './App.css'
import SignIn from './components/pages/SignIn'
import { useEffect, useState } from 'react'
import IAdmin from './interfaces/IAdmin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import NewPropValue from './components/pages/Props/Values/NewPropValue'
import EditPropValue from './components/pages/Props/Values/EditPropValue'
import { Vendors } from './components/pages/Vendor/Vendors'
import { Vendor } from './components/pages/Vendor/Vendor'
import NewVendor from './components/pages/Vendor/NewVendor'
import { EditVendor } from './components/pages/Vendor/EditVendor'
import Admins from './components/pages/Admins/Admins'
import NewAdmin from './components/pages/Admins/NewAdmin'


const queryClient = new QueryClient()
export default function App() {
  const [admin, setAdmin] = useState<IAdmin | undefined>()

  axios.defaults.baseURL = "http://localhost:3000/api"

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

                  <Route path='/admins' element={<Admins />}></Route>
                  <Route path='/admins/new' element={<NewAdmin />}></Route>

                  <Route path='/props' element={<Props />}></Route>
                  <Route path='/props/new' element={<NewProp />}></Route>
                  <Route path='/props/:propId/values/new' element={<NewPropValue />}></Route>
                  <Route path='/props/:propId/values/edit/:valueId' element={<EditPropValue />}></Route>
                  <Route path="/props/edit/:propId" element={<EditProp />} />
                  <Route path="/props/:propId" element={<PropDetails />} />

                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/new" element={<NewCategory />} />
                  <Route path="/categories/edit/:id" element={<EditCategory />} />
                  <Route path="/categories/:id" element={<Category />} />
                  <Route path="/categories/:id/new" element={<NewSubcategory />} />
                  <Route path="/categories/:catId/subcategory/:subCtId" element={<Subcategory />} />\

                  <Route path="/vendors" element={<Vendors />} />
                  <Route path="/vendors/:id" element={<Vendor />} />
                  <Route path="/vendors/new" element={<NewVendor />} />
                  <Route path="/vendors/edit/:id" element={<EditVendor />} />
                </Routes>
              </BrowserRouter>
            </>}
        </div >
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AdminContext.Provider>

  )
} 

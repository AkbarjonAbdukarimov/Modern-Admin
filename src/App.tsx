import "./App.css";
import SignIn from "./components/pages/SignIn";
import { useEffect, useState } from "react";
import IAdmin from "./interfaces/IAdmin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import navLinks from "./utils/NavLinks";
import AdminContext from "./context/AdminContext";
import Products from "./components/pages/Products/Products";
import NewProduct from "./components/pages/Products/NewProduct/NewProduct";
import Categories from "./components/pages/Categories/Categories";
import Category from "./components/pages/Categories/Category";
import Subcategory from "./components/pages/Subcategory/Subcategory";
import Props from "./components/pages/Props/Props";
import PropDetails from "./components/pages/Props/PropDetails";
import NewCategory from "./components/pages/Categories/NewCategory";
import NewSubcategory from "./components/pages/Subcategory/NewSubcategory";
import axios from "axios";
import EditCategory from "./components/pages/Categories/EditCategory";
import NewProp from "./components/pages/Props/NewProp";
import EditProp from "./components/pages/Props/EditProp";
import NewPropValue from "./components/pages/Props/Values/NewPropValue";
import EditPropValue from "./components/pages/Props/Values/EditPropValue";
import { Vendors } from "./components/pages/Vendor/Vendors";
import { Vendor } from "./components/pages/Vendor/Vendor";
import NewVendor from "./components/pages/Vendor/NewVendor";
import { EditVendor } from "./components/pages/Vendor/EditVendor";
import Admins from "./components/pages/Admins/Admins";
import NewAdmin from "./components/pages/Admins/NewAdmin";
import EditSubcategory from "./components/pages/Subcategory/EditSubcategory";
import EditAdmin from "./components/pages/Admins/EditAdmin";
import Product from "./components/pages/Products/Product";
import EditProduct from "./components/pages/Products/NewProduct/EditProduct";
import Orders from "./components/pages/Orders/Orders";
import CustomAppBar from "./components/AppBar/AppBar";
import { backend } from "./URLS";
import { socket } from "./socket";
import Chat from "./components/pages/Chats/Chat";
import MessagingArea from "./components/pages/Chats/Message/MessagingArea";
import IChat from "./interfaces/IChat";
import Index from "./components/pages";
import InedxPage from "./components/pages";
import NewSlide from "./components/pages/Slides/NewSlide";
const queryClient = new QueryClient();

export default function App() {
  const [admin, setAdmin] = useState<IAdmin | undefined>();
  const [selectedChat, setSelectedChat] = useState<IChat>();

  axios.defaults.baseURL = backend + "api";

  axios.defaults.headers.common["Authorization"] = admin?.token;

  useEffect(() => {
    const a = localStorage.getItem("admin");
    if (a !== "undefined" && a) {
      const parsed = JSON.parse(a);
      setAdmin(parsed);
      socket.connect();

      socket.emit("newUser", parsed);
    }
  }, []);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      <QueryClientProvider client={queryClient}>
        <div className="">
          {!admin ? (
            <SignIn />
          ) : (
            <>
              <BrowserRouter>
                <CustomAppBar
                  navLinks={navLinks}
                  setUser={setAdmin}
                  selectedChat={selectedChat}
                  setSelectedChat={setSelectedChat}
                />

                <Routes>
                  <Route
                    path="/"
                    element={admin.super ? <InedxPage /> : <Products />}
                  />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/new" element={<NewProduct />} />
                  <Route path="/products/edit/:id" element={<EditProduct />} />
                  <Route path="/products/:id" element={<Product />} />

                  <Route path="/orders" element={<Orders />} />
                  <Route path="/chats" element={<Chat />} />
                  <Route
                    path="/chats/:chatId"
                    element={<MessagingArea chat={selectedChat} user={admin} />}
                  />
                  {admin.super ? (
                    <>
                      <Route path="/admins" element={<Admins />}></Route>
                      <Route path="/admins/new" element={<NewAdmin />}></Route>
                      <Route
                        path="/admins/edit/:id"
                        element={<EditAdmin />}
                      ></Route>
                      <Route path="/props" element={<Props />}></Route>
                      <Route path="/props/new" element={<NewProp />}></Route>
                      <Route
                        path="/props/:propId/values/new"
                        element={<NewPropValue />}
                      ></Route>
                      <Route
                        path="/props/:propId/values/edit/:valueId"
                        element={<EditPropValue />}
                      ></Route>
                      <Route
                        path="/props/edit/:propId"
                        element={<EditProp />}
                      />
                      <Route path="/props/:propId" element={<PropDetails />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/categories/new" element={<NewCategory />} />
                      <Route
                        path="/categories/:id/subcategory/edit/:subctId"
                        element={<EditSubcategory />}
                      />
                      <Route
                        path="/categories/edit/:id"
                        element={<EditCategory />}
                      />
                      <Route path="/categories/:id" element={<Category />} />
                      <Route
                        path="/categories/:id/new"
                        element={<NewSubcategory />}
                      />
                      <Route
                        path="/categories/:catId/subcategory/:subCtId"
                        element={<Subcategory />}
                      />

                      <Route path="/vendors" element={<Vendors />} />
                      <Route path="/vendors/:id" element={<Vendor />} />
                      <Route path="/vendors/new" element={<NewVendor />} />
                      <Route
                        path="/vendors/:vendorId/:id"
                        element={<Product />}
                      />
                      <Route
                        path="/vendors/edit/:id"
                        element={<EditVendor />}
                      />

                      <Route path="/slides/new" element={<NewSlide />} />
                    </>
                  ) : (
                    <></>
                  )}
                </Routes>
              </BrowserRouter>
            </>
          )}
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AdminContext.Provider>
  );
}

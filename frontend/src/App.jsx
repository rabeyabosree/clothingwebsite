import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ComponentLayout from './components/common/ComponentLayout';
import AllProducts from './pages/public/AllProducts';
import SingleProduct from './pages/public/SingleProduct';
import CartPage from './pages/public/CartPage';
import CheckOut from './pages/public/CheckOut';
import Contact from './pages/public/Contact';
import About from './pages/public/About';
import Home from './pages/public/home/Home';
import Admindashboard from './pages/admin/Admindashboard';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Productdetails from './pages/admin/Productdetails';
import Orders from './pages/admin/Orders';
import SingleOrder from './pages/admin/SingleOrder';
import Users from './pages/admin/Users';
import SingleUser from './pages/admin/SingleUser';
import Inventory from './pages/admin/Inventory';
import Invoice from './pages/admin/Invoice';
import Websitesettings from './pages/admin/Websitesettings';
import Account from './pages/admin/Account';
import LoginPage from './pages/auth/LoginPage';
import Registerpage from './pages/auth/Registerpage';
import MyOrders from './pages/userpanel/MyOrders';
import OrderDetails from './pages/userpanel/OrderDetails';
import Forgotpassword from './pages/auth/Forgotpassword';
import Resetpassword from './pages/auth/Resetpassword';
import { Settings } from 'lucide-react';
import Wishlist from './pages/userpanel/Wishlist';
import Addproduct from './pages/admin/Addproduct';
import EditProduct from './pages/admin/EditProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />

        {/* user panel */}

        <Route path='/orders/:id' element={<OrderDetails />} />

        {/* user routes */}
        <Route element={<ComponentLayout />}>
          <Route path='/shop' element={<AllProducts />} />
          <Route path='/shop/:id' element={<SingleProduct />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />

          <Route path='/settings' element={<Settings />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/wishlist' element={<Wishlist />} />

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Registerpage />} />
          <Route path='/forgot-password' element={<Forgotpassword />} />
          <Route path='/reset-password/:token' element={<Resetpassword />} />


        </Route>

        {/* admin routes */}
        <Route path='/dashboard' element={<Admindashboard />}>
          <Route index element={<Dashboard />} />
          <Route path='products' element={<Products />} />
          <Route path='products/new' element={<Addproduct />} />
          <Route path='products/:id' element={<Productdetails />} />
          <Route path='products/edit/:id' element={<EditProduct />} />
          <Route path='orders' element={<Orders />} />
          <Route path='orders/:id' element={<SingleOrder />} />
          <Route path='users' element={<Users />} />
          <Route path='users/:id' element={<SingleUser />} />
          <Route path='inventory' element={<Inventory />} />
          <Route path='invoices' element={<Invoice />} />
          <Route path='settings' element={<Websitesettings />} />
          <Route path='account' element={<Account />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

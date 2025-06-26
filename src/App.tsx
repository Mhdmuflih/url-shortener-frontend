import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import LoginProtector from './RouterProtector/LoginProtector';
import RouteProtector from './RouterProtector/RouteProtector';

function App() {
  return (
    <>
      <Routes>

        <Route element={<RouteProtector />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route element={<LoginProtector />}>
          <Route path='/registration' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App

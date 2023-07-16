import './App.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'


const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>
  },
])

function App() {
  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App

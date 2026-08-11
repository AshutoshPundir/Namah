import './App.css'
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/protectedRoute';
import Home from './pages/Home';
import GuestRoute from './components/GuestRoute';
function App() {
  return (
    <Routes>
        <Route 
          path='/register' 
          element={
            <GuestRoute>
              <Register/>
            </GuestRoute>
            } />

        <Route 
          path='/login' 
          element={
            <GuestRoute>
              <Login/>
            </GuestRoute>
            } />

        <Route 
          path='/app' 
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          } />
    </Routes>
  )
}

export default App

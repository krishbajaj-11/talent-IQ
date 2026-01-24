
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import { Navigate,Routes,Route } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProblemsPage from './pages/ProblemsPage.jsx'
import { useUser } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'



function App() {
  
const { isSignedIn, isLoaded } = useUser();
  return (
    <>
    <Routes>
     <Route path='/' element={<HomePage />} />
     
     <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
    </Routes>
    <Toaster />
    </>
  )
}

export default App

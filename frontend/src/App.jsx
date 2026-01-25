
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import { Navigate,Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ProblemsPage from './pages/ProblemsPage.jsx'
import { useUser } from '@clerk/clerk-react'
import DashboardPage from './pages/DashboardPage.jsx'




function App() {
  
const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;
  return (
    <>
       <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />

        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
       
      </Routes>
    </>
  )
}

export default App

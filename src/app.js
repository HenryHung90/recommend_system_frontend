import { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"

//Page
import Error from './views/Error/Error'
import Home from './views/Home/Home'
import Login from './views/Login/Login'

const App = () => {
    const [Auth, setAuth] = useState(false)

    if (Auth) {
        return (
            <Router>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </Router>
        )
    } else {
        return (
            <Router>
                <Routes>
                    <Route path='/home' element={<Login />} />
                    <Route path='/' element={<Login />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </Router>
        )
    }

}

export default App

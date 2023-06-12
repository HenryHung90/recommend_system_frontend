import { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"

import { Connection } from './common/axiosConnect'

//Page
import Error from './views/Error/Error'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Exam from './views/Exam/Exam'

const App = () => {
    const [Auth, setAuth] = useState(false)

    const [UserName, setUserName] = useState("Test")

    useEffect(() => {
        if (localStorage.getItem('token')) {
            Connection.checkLogin(localStorage.getItem('token')).then(res => {
                if (res.data.state) {
                    setAuth(true)
                    setUserName(res.data.result.name)
                } else {
                    Connection.refreshToken(localStorage.getItem('token')).then(res => {
                        if (res.data.state) {
                            const tokenDetail = Connection.decode(res.data.result[0].token)

                            localStorage.setItem("token", res.data.result[0].token)
                            localStorage.setItem('refrest_token', tokenDetail.refreshToken)

                            setAuth(true)
                            setUserName(tokenDetail.name)
                        } else {
                            setAuth(false)
                            localStorage.clear()
                            if (window.location.href !== '/')
                                window.location.href = '/'
                        }
                    })
                }
            })
        }
    })

    if (process.env.REACT_APP_TESTING_MODE) {
        console.log("Testing mode enabled")
        return (
            <Router>
                <Routes>
                    <Route path='/home' element={<Home UserName={UserName} />} />
                    <Route path="/exam" element={<Exam UserName={UserName} />} />
                    <Route path='/' element={<Login setUserName={setUserName} setAuth={setAuth} />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </Router>
        )
    } else {
        if (Auth) {
            return (
                <Router>
                    <Routes>
                        <Route path='/home' element={<Home UserName={UserName} />} />
                        <Route path="/exam" element={<Exam UserName={UserName} />} />
                        <Route path='/' element={<Home UserName={UserName} />} />
                        <Route path='*' element={<Error />} />
                    </Routes>
                </Router>
            )
        } else {
            return (
                <Router>
                    <Routes>
                        <Route path='*' element={<Login setUserName={setUserName} setAuth={setAuth} />} />
                    </Routes>
                </Router>
            )
        }
    }
}

export default App

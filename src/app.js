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
import Statistics from './views/Statistics/Statistics'
import History from './views/History/History'

const App = () => {
    useEffect(() => {
        (() => {
            function block() {
                setInterval(() => {
                    Function("debugger")();
                }, 50);
            }
            try {
                block();
            } catch (err) { }
        })();
        //禁止調適 localStorage
        window.addEventListener("storage", (e) => {
            localStorage.clear()
            window.location.href = '/'
        })
    }, [])

    const [Auth, setAuth] = useState(false)

    const [UserName, setUserName] = useState("Test")

    const AuthRouter = () => {
        return (
            <Routes>
                <Route path='/home' element={<Home UserName={UserName} />} />
                <Route path="/exam" element={<Exam UserName={UserName} />} />
                <Route path="/statistics" element={<Statistics UserName={UserName} />} />
                <Route path="/history" element={<History UserName={UserName} />} />
                <Route path='/' element={<Home UserName={UserName} />} />
                <Route path='*' element={<Error />} />
            </Routes>
        )
    }

    // 確認是否登入
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
    }, [])


    if (process.env.REACT_APP_TESTING_MODE === 'true') {
        console.log("Testing mode enabled")
        return (
            <Router>
                <AuthRouter />
            </Router>
        )
    } else {
        if (Auth) {
            return (
                <Router>
                    <AuthRouter />
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

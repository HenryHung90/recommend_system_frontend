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

//Dashboard Page
import { Dashboard_teacher, Dashboard_admin } from './views/Dashboard/Dashboard'

const App = () => {
    // useEffect(() => {
    //     (() => {
    //         function block() {
    //             setInterval(() => {
    //                 Function("debugger")();
    //             }, 50);
    //         }
    //         try {
    //             block();
    //         } catch (err) { }
    //     })();
    //     //禁止調適 localStorage
    //     //一旦主動更改 localStorage 即立即清空所有localStorage
    //     window.addEventListener("storage", (e) => {
    //         localStorage.clear()
    //         window.location.href = '/'
    //     })
    // }, [])

    const [Auth, setAuth] = useState(false)
    const [Admin, setAdmin] = useState(false)
    const [Teacher, setTeacher] = useState(false)

    const [UserName, setUserName] = useState("Test")

    //基本路徑
    const BasicRoutes = () => {
        return (
            <>
                <Route path='/home' element={< Home UserName={UserName} Teacher={Teacher}/>} />
                <Route path="/exam" element={<Exam UserName={UserName} />} />
                <Route path="/statistics" element={<Statistics UserName={UserName} />} />
                <Route path="/history" element={<History UserName={UserName} />} />
                <Route path='/' element={<Home UserName={UserName} />} />
                <Route path='*' element={<Error />} />
            </>
        )
    }

    //一般使用者
    const AuthRouter = () => {
        return (
            <Routes>
                {BasicRoutes()}
            </Routes>
        )
    }

    //教師
    const TeacherRouter = () => {
        return (
            <Routes>
                {BasicRoutes()}
                <Route path="/Tdashboard" element={<Dashboard_teacher UserName={UserName} />} />
            </Routes>
        )
    }

    //管理員
    const AdminRouter = () => {
        return (
            <Routes>
                {BasicRoutes()}
                <Route path="/Tdashboard" element={<Dashboard_teacher UserName={UserName} />} />
                <Route path="/Adashboard" element={<Dashboard_admin UserName={UserName} />} />
            </Routes>
        )
    }

    // 確認是否登入
    useEffect(() => {
        if (localStorage.getItem('token')) {
            Connection.checkLogin(localStorage.getItem('token')).then(res => {
                if (res.data.state) {
                    const tokenDetail = Connection.decode(localStorage.getItem('token'))

                    setAuth(true)
                    setAdmin(tokenDetail.is_admin)
                    setTeacher(tokenDetail.is_teacher)
                    setUserName(tokenDetail.name)
                } else {
                    Connection.refreshToken(localStorage.getItem('token')).then(res => {
                        if (res.data.state) {
                            const tokenDetail = Connection.decode(res.data.result[0].token)

                            localStorage.setItem("token", res.data.result[0].token)
                            localStorage.setItem('refrest_token', tokenDetail.refreshToken)

                            setAuth(true)
                            setAdmin(tokenDetail.is_admin)
                            setTeacher(tokenDetail.is_teacher)
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
                <AdminRouter />
            </Router>
        )
    } else {
        if (Auth) {
            if (Admin) {
                return (
                    <Router>
                        <AdminRouter />
                    </Router>
                )
            }
            else if (Teacher)
                return (
                    <Router>
                        <TeacherRouter />
                    </Router>
                )
            return (
                <Router>
                    <AuthRouter />
                </Router>
            )
        } else {
            return (
                <Router>
                    <Routes>
                        <Route path='*' element={<Login setUserName={setUserName} setAuth={setAuth} setAdmin={setAdmin} setTeacher={setTeacher} />} />
                    </Routes>
                </Router>
            )
        }
    }
}

export default App

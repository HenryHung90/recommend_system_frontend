import axios from "axios"

const Connection = {
    //登入
    login: (acc, pws) => {
        return (
            axios({
                method: 'POST',
                url: process.env.REACT_APP_BACKEND_LOGIN,
                data: {
                    acc: acc,
                    pws: pws
                }
            })
        )
    },
    // 解碼 jwt token
    decode: token => JSON.parse(decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''))),
    // 更新 token
    refreshToken: token => {
        return (
            axios({
                method: 'POST',
                url: process.env.REACT_APP_BACKEND_REFRESH_TOKEN,
                data: {
                    refresh_token: token
                }
            })
        )
    },
    // 檢驗是否登入
    checkLogin: token => {
        return (
            axios({
                method: 'GET',
                url: process.env.REACT_APP_BACKEND_CHECKLOGIN,
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": 'application/json',
                }
            })
        )
    },
    // 檢驗考試狀態(考過多少)
    checkExamStatus: token => {
        return (
            axios({
                method: 'GET',
                url: process.env.REACT_APP_BACKEND_CHECKEXAM_STATUS,
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": 'application/json',
                }
            })
        )
    },
    // 請求考試卷
    requestExamSheet: (token, type) => {
        return (
            axios({
                method: 'POST',
                url: type === 'First' ? process.env.REACT_APP_BACKEND_FIRSTEXAM : process.env.REACT_APP_BACKEND_CONTENTBASEEXAM,
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
        )
    },
    submitExamSheet: (token, paper_id, answer_list, paper_type) => {
        return (
            axios({
                method: 'POST',
                url: process.env.REACT_APP_BACKEND_SUBMITEXAM,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                data: {
                    paper_id: paper_id,
                    answer_list: answer_list,
                    paper_type: paper_type
                }
            })
        )
    },
    // 請求完成的考試卷
    getCompleteExamSheet: (token, type) => {
        return (
            axios({
                method: 'GET',
                url: type === 'First' ? process.env.REACT_APP_BACKEND_FIRSTEXAM : process.env.REACT_APP_BACKEND_CONTENTBASEEXAM,
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": 'application/json',
                }
            })
        )
    },
}


export { Connection }
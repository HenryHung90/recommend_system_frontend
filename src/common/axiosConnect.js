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
    //登出
    logout: (token) => {
        return (
            axios({
                method: "POST",
                url: process.env.REACT_APP_BACKEND_LOGOUT,
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": 'application/json',
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
                url: process.env.REACT_APP_BACKEND_EXAM,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                //Data => type[string] first_test || content_based_test
                data: {
                    paper_type: type
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
    getCompleteExamSheet: (token, paperIndex) => {
        return (
            axios({
                method: 'GET',
                url: process.env.REACT_APP_BACKEND_EXAM,
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": 'application/json',
                },
                params: {
                    paper_index: paperIndex,
                }
            })
        )
    },
    // 請求所有考完的考試卷
    getAllCompleteExamSheets: (token) => {
        return (
            axios({
                method: 'GET',
                url: process.env.REACT_APP_BACKEND_GETALLCOMPLELECTEXAMSHEET,
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": 'application/json'
                }
            })
        )
    },

    // 教師端
    // get_type => question_db 所有題目 // all_paper_type 全部卷次 // all_student 全部分數加總&學生列表 // student_status 學生答題情形
    // paper_index => 卷次(適用於 all_student)
    // student_id => 單個學生(適用於 student_status)
    getQuestionDB: (token, get_type, paper_index, student_id) => {
        return (
            axios({
                method: "GET",
                url: process.env.REACT_APP_BACKEND_MAIN_TEACHER,
                params: {
                    get_type: get_type,
                    paper_index: paper_index || '',
                    student_id: student_id || ''
                },
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": 'application/json'
                }
            })
        )
    },
    // 取得Question type
    getQuestionAttribute: (token, major_type_id, type_id) => {
        return (
            axios({
                method: "GET",
                url: process.env.REACT_APP_BACKEND_GET_QUESTION_TYPE,
                params: {
                    major_type_id: major_type_id || "",
                    type_id: type_id || "",
                },
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "application/json"
                }
            })
        )
    },
    // 取得 difficult type
    getDifficultyType: (token) => {
        return (
            axios({
                method: "GET",
                url: process.env.REACT_APP_BACKEND_GET_DIFFICULTY_TYPE,
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "application/json"
                }
            })
        )
    },
    // 取得 question category (單多選)
    getQuestionCategoryType: (token) => {
        return (
            axios({
                method: "GET",
                url: process.env.REACT_APP_BACKEND_GET_CATEGORY_TYPE,
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "application/json"
                }
            })
        )
    },
    // 取得 bloom category (題目類型)
    getBloomType: (token) => {
        return (
            axios({
                method: "GET",
                url: process.env.REACT_APP_BACKEND_GET_BLOOM_TYPE,
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "application/json"
                }
            })
        )
    },

    // 輸入題目
    submitNewQuestion: (token, questionData) => {
        return (
            axios({
                method: 'post',
                url: process.env.REACT_APP_BACKEND_QUESTION,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                },
                data: questionData,
            })
        )
    },
    // 修改題目
    editQuestion: (token, questionData) => {
        return (
            axios({
                method: 'PUT',
                url: process.env.REACT_APP_BACKEND_QUESTION,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                },
                data: questionData,
            })
        )
    },
    // 刪除題目
    deleteQuestion: (token, questionData) => {
        return (
            axios({
                method: "Delete",
                url: process.env.REACT_APP_BACKEND_QUESTION,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                data: questionData
            })
        )
    },
    //testing
    uploadStudents: (acc, pws, name) => {
        axios({
            method: 'POST',
            url: 'http://140.138.147.14:8000/api/user',
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGltbyIsIl9pZCI6IjJkNjYyOGFiLTA1MTEtMTFlZS04MmFiLWQ4NWVkM2E2OTgyYyIsImV4cCI6MTY4NjUwMTA1NS43MjU3OSwiaWF0IjoxNjg2NDkwMjU1LjcyNTc5LCJpc19hZG1pbiI6ZmFsc2UsImlzX3RlYWNoZXIiOmZhbHNlLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnlaV1p5WlhOb1gzUnZhMlZ1SWpvd0xDSmxlSEFpT2pFMk9EWTFNRGd5TlRVdU56STFOemtzSW1saGRDSTZNVFk0TmpRNU1ESTFOUzQzTWpVM09Td2lYMmxrSWpvaU1tUTJOakk0WVdJdE1EVXhNUzB4TVdWbExUZ3lZV0l0WkRnMVpXUXpZVFk1T0RKakluMC42Uzh0aTVBWVdvTWtQTzJ0ZTh4bEVaS1lmQ0ZQdU00UFBaXzI0M00yR0pVIn0.6qrUlfTz4OH5HYHmyYtsmeMNO01w7Wc3sI07Ko9d1f0",
                "Content-Type": "application/json"
            },
            data: {
                acc: acc,
                pws: pws,
                name: name
            }
        })
    }
}


export { Connection }
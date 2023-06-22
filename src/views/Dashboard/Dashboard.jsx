import { useState, useEffect } from "react";

import { Connection } from "../../common/axiosConnect";

import MainDashboard from "./Components/MainDashboard";

const Dashboard_teacher = ({ UserName }) => {
    //所有題目(包含正確回答數、總回答數)
    const [paperQuestionQuery, setpaperQuestionQuery] = useState([]);

    useEffect(() => {
        Connection.getDashboardTeacher(localStorage.getItem("token")).then(
            res => {
                console.log(res);
                setpaperQuestionQuery(res.data.result);
                //answer_num 總回答數
                //correct_num 正確回答數
            }
        );
    }, []);

    return (
        <MainDashboard
            UserName={UserName}
            paperQuestionQuery={paperQuestionQuery}
        />
    );
};

const Dashboard_admin = ({ UserName }) => {
    return <MainDashboard UserName={UserName} />;
};

export { Dashboard_teacher, Dashboard_admin };

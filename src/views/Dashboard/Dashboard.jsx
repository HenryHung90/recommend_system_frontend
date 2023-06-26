import { useState, useEffect } from "react";

import { Connection } from "../../common/axiosConnect";

import Loading from "../Components/Loading/Loading";
import AlertLog from "../Components/AlertLog/AlertLog";
import MainDashboard from "./Components/MainDashboard";

const Dashboard_teacher = ({ UserName }) => {
    //AlertLog & Loading Setting------------------------------
    //AlertLog
    const [AlertOpen, setAlertLog] = useState(false);
    const [AlertTitle, setAlertTitle] = useState("");
    const [AlertMsg, setAlertMsg] = useState("");
    const handleAlertLogClose = () => {
        setAlertLog(false);
        setTimeout(() => {
            setAlertTitle("");
            setAlertMsg("");
        }, 500);
    };
    const handelAlertLogSetting = (Title, Msg) => {
        setAlertLog(true);
        setAlertTitle(Title);
        setAlertMsg(Msg);
    };
    //Loading
    const [LoadingOpen, setLoading] = useState(false);
    //---------------------------------------------------------
    return (
        <>
            <Loading Loading={LoadingOpen} />
            <AlertLog
                AlertLog={AlertOpen}
                setAlertLog={handleAlertLogClose}
                AlertTitle={AlertTitle}
                AlertMsg={AlertMsg}
            />
            <MainDashboard
                UserName={UserName}
                setLoading={setLoading}
                handelAlertLogSetting={handelAlertLogSetting}
            />
        </>

    );
};


const Dashboard_admin = ({ UserName }) => {
    return <MainDashboard UserName={UserName} />;
};

export { Dashboard_teacher, Dashboard_admin };

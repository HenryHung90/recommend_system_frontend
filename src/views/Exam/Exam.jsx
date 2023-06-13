import { useEffect, useState } from "react";
import $ from 'jquery'

import { Box, Fade, Container } from "@mui/material";
import { Main_Container } from "../../common/ContainerStyle";
import { handleStartExammingNav } from "../../common/examBtnClick";

import { Nav } from "../Components/Nav/Nav";
import Loading from "../Components/Loading/Loading";
import AlertLog from "../Components/AlertLog/AlertLog";

import Intro from "./Components/Intro";
import ExamContent from "./Components/ExamContent";

const Exam = ({ UserName }) => {
    const [NavBarOpen, setNavBarOpen] = useState(false);

    //localStorage規則 (皆須在考完試後全部清除)
    // 1. Testing: 表示現在正在進行考試，尚未結束，結束後須清除該標記
    // 2. paperAnswerSheet: 該張考卷的答案陣列
    // 3. questionQuery: 該張考卷的考題

    //儲存答案
    const [QuestionQuery, setQuestionQuery] = useState([]);

    // 若已經進入考試狀態，則儲存考試的考題並回到考試狀態
    useEffect(() => {
        if (localStorage.getItem("Testing")) {
            setExamStatus("Examming");
            setQuestionQuery(JSON.parse(localStorage.getItem("questionQuery")));
        }
    }, []);

    //設定狀態 Intro => 未考試 Examming => 考試
    const [ExamStatus, setExamStatus] = useState("Intro");
    useEffect(() => {
        if (ExamStatus === "Examming") {
            handleStartExammingNav();
            localStorage.setItem("Testing", true);
            $(document)
                .on("keydown", e => {
                    e.preventDefault();
                })
                .on("contextmenu", e => {
                    return false;
                });
        } else {
            $(document).off("keydown").off("contextmenu");
        }
    }, [ExamStatus]);
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
            <Fade in={true} timeout={1200}>
                <Container
                    sx={{
                        width: "100vw",
                        maxWidth: "none !important",
                        display: "flex",
                        height: "100vh",
                        margin: "0 !important",
                        padding: "0  !important",
                    }}
                >
                    {localStorage.getItem("Testing") !== "true" && (
                        <>
                            <Nav
                                NavBarOpen={NavBarOpen}
                                setNavBarOpen={setNavBarOpen}
                                UserName={UserName}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    width: "100vw",
                                    height: "100vh",
                                    overflow: "hidden",
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                    opacity: NavBarOpen ? "1" : "0",
                                    transitionDuration: "0.5s",
                                    zIndex: NavBarOpen ? "999" : "-100",
                                }}
                                onClick={() => setNavBarOpen(false)}
                            ></Box>
                        </>
                    )}
                    <Container
                        id={"Exam_Container"}
                        sx={Main_Container(NavBarOpen)}
                    >
                        {ExamStatus === "Intro" && (
                            <Intro
                                setExamStatus={setExamStatus}
                                AlertLog={handelAlertLogSetting}
                                Loading={setLoading}
                                setQuestionQuery={setQuestionQuery}
                            />
                        )}
                        {ExamStatus === "Examming" && (
                            <ExamContent
                                setExamStatus={setExamStatus}
                                AlertLog={handelAlertLogSetting}
                                Loading={setLoading}
                                QuestionQuery={QuestionQuery}
                                UserName={UserName}
                            />
                        )}
                    </Container>
                </Container>
            </Fade>
        </>
    );
};

export default Exam;

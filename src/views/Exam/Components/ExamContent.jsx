import { useState, useEffect } from "react";
import $ from "jquery";

import {
    isLocalStorageSetOpen,
    submitPaperSheet,
    handleSubmitPaper,
} from "../../../common/examHandleEvent";

import SingleSelection from "../../Components/ExamQuestion/SingleSelection";
import MultiSelection from "../../Components/ExamQuestion/MultiSelection";

import { Box, Container, Button } from "@mui/material";

//題目樣式
const ExamQuestionComponent = ({ Questions }) => {
    const SET_LOCALSTORAGE = localStorage.setItem;
    // 檢查是否做過題目
    useEffect(() => {
        // 當前答案卷狀態
        const paperAnswerSheet = JSON.parse(
            localStorage.getItem("paperAnswerSheet")
        );

        if (paperAnswerSheet) {
            paperAnswerSheet.map((question, index) => {
                if (question.split(",")[0] !== "") {
                    $(`#${questionUUID()[index]}`).css("opacity", "0.5");
                }
            });
        }
        // 取消LOCALSTORAGE setItem 功能
        setTimeout(() => {
            isLocalStorageSetOpen(false, SET_LOCALSTORAGE);
        }, 1000);
    });

    const [paperAnswerSheet, setPaperAnswerSheet] = useState(
        JSON.parse(localStorage.getItem("paperAnswerSheet"))
            ? JSON.parse(localStorage.getItem("paperAnswerSheet"))
            : new Array(Questions.length).fill("")
    );
    //取得題目的uuid
    const questionUUID = () => {
        let returnAry = [];
        for (const { uuid } of Questions) {
            returnAry.push(uuid);
        }
        return returnAry;
    };

    const handleSelectingOptions = e => {
        // 回復功能
        isLocalStorageSetOpen(true, SET_LOCALSTORAGE);
        const Type = e.currentTarget.type;
        const Name = e.currentTarget.name;
        const Value = e.currentTarget.value;

        // 當前答案卷狀態
        const paperAnswerSheet = JSON.parse(
            localStorage.getItem("paperAnswerSheet")
        );
        // 選項題目之 Array 所在位置
        const answerIndex = questionUUID().indexOf(Name);

        // 儲存當前答案陣列 => 答案目前為 "1,2" => nowAnswer = ["1","2"]
        let nowAnswer =
            paperAnswerSheet[answerIndex] === ""
                ? new Array(0)
                : paperAnswerSheet[answerIndex].split(",");

        // 多選----------------------------------------------
        if (Type === "checkbox") {
            // 確認當前題目的 index 位置 => 多選是否已經選過
            nowAnswer.includes(Value)
                ? (nowAnswer = nowAnswer.filter(answer => answer !== Value))
                : nowAnswer.push(Value);

            if (nowAnswer.length === 0) {
                $(`#${e.currentTarget.name}`).css("opacity", "1");
            } else {
                $(`#${e.currentTarget.name}`).css("opacity", "0.5");
            }
            //進行升冪排序
            nowAnswer = nowAnswer.sort((a, b) => a - b);
        }
        // 單選----------------------------------------------
        else if (Type === "radio") {
            //若為單選則直接選擇
            nowAnswer = [Value];
            $(`#${e.currentTarget.name}`).css("opacity", "0.5");
        }

        //重回 string 並存回 answerSheet 中
        paperAnswerSheet[answerIndex] = nowAnswer.join(",");
        localStorage.setItem(
            "paperAnswerSheet",
            JSON.stringify(paperAnswerSheet)
        );
        setPaperAnswerSheet(paperAnswerSheet);

        setTimeout(() => {
            isLocalStorageSetOpen(false, SET_LOCALSTORAGE);
        }, 1);
    };

    return (
        <Container
            sx={{
                margin: "10px auto",
                padding: "10px 35px",
                width: "100%",
            }}
        >
            {Questions.map((value, INDEX) => {
                const options = [
                    value.options1,
                    value.options2,
                    value.options3,
                    value.options4,
                    value.options5,
                ];
                return (
                    <Box
                        id={value.uuid}
                        key={INDEX + 1}
                        sx={{
                            margin: "20px auto",
                            padding: "10px 35px",
                            borderRadius: "5px",
                            boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.5)",
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: 24,
                                fontWeight: "bold",
                                display: "flex",
                            }}
                        >
                            <Box>{INDEX + 1}、</Box>
                            <Box>{`${value.question}`}</Box>
                        </Box>
                        {value.category === 1 && (
                            <SingleSelection
                                Type={"Exam"}
                                uuid={value.uuid}
                                handleSelectingOptions={handleSelectingOptions}
                                options={options}
                                paperAnswerSheet={paperAnswerSheet[INDEX]}
                            />
                        )}
                        {value.category === 2 && (
                            <MultiSelection
                                Type={"Exam"}
                                uuid={value.uuid}
                                handleSelectingOptions={handleSelectingOptions}
                                options={options}
                                paperAnswerSheet={paperAnswerSheet[INDEX]}
                            />
                        )}
                    </Box>
                );
            })}
        </Container>
    );
};

const ExamContent = ({
    setExamStatus,
    AlertLog,
    Loading,
    QuestionQuery,
    UserName,
}) => {
    const [isTimeout, setTimeout] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("Testing")) {
            localStorage.setItem(
                "paperAnswerSheet",
                JSON.stringify(
                    new Array(QuestionQuery.question_list.length).fill("")
                )
            );
        }
        // 剩餘時間計時器--------------------------------------------
        setInterval(() => {
            // 截止時間
            const deadTime =
                Date.parse(QuestionQuery.created_on) + 30 * 60 * 1000;
            // 剩餘時間
            const limitTime = deadTime - Date.parse(new Date());

            // 剩餘分鐘數
            const limitMin = parseInt(limitTime / (1000 * 60));
            // 剩餘秒數
            const limitSec = parseInt(limitTime / 1000 - limitMin * 60);
            $("#Exam_LimitTime").text(
                `剩餘時間: ${limitMin} 分 ${limitSec} 秒`
            );

            if (limitMin <= 0 && limitSec <= 0) {
                setTimeout(true);
                return;
            }
        }, 1000);
        //-------------------------------------------------------------
    }, []);

    useEffect(() => {
        if (isTimeout) {
            AlertLog("通知", "考試時間到!");
            Loading(true);

            setTimeout(() => {
                submitPaperSheet(AlertLog, Loading, setExamStatus);
            }, 3000);
        }
    }, [isTimeout]);

    return (
        <Container
            sx={{
                width: "100%",
                height: "auto",
                boxShadow: "1px 0 5px rgba(0, 0, 0, 0.5)",
                borderRadius: "12px",
                display: "flex",
                textAlign: "center",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    fontSize: 60,
                    fontWeight: "bolder",
                    width: "100%",
                    margin: "20px auto",
                }}
            >
                {`測驗: ${QuestionQuery.paper_type}`}
            </Box>
            <Box
                sx={{
                    fontSize: 30,
                    fontWeight: "bold",
                    margin: "10px auto",
                    paddingBottom: 10,
                    borderRadius: "12px",
                    width: "100%",
                    borderBottom: "1px solid rgba(0,0,0,0.5)",
                }}
            >
                <Box id={"Exam_LimitTime"}>{`剩餘時間: --分 -- 秒`}</Box>
                <Box
                    sx={{
                        fontSize: 30,
                        fontWeight: "bold",
                    }}
                >{`考試人: ${UserName}`}</Box>
            </Box>

            <Container
                id={"Exam_QuestionContainer"}
                sx={{
                    width: "100%",
                    borderRadius: 2,
                    backgroundColor: "rgba(183,74,95,0.2)",
                    textAlign: "left",
                }}
            >
                <ExamQuestionComponent
                    Questions={QuestionQuery.question_list}
                />
            </Container>
            <Button
                variant="contained"
                sx={{
                    margin: "50px auto",
                    width: 350,
                }}
                size="large"
                onClick={() =>
                    handleSubmitPaper(AlertLog, Loading, setExamStatus)
                }
            >
                寫完了，交卷!
            </Button>
        </Container>
    );
};

export default ExamContent;

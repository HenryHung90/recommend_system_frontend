import { useEffect, useState } from "react";

import { Connection } from "../../../common/axiosConnect";

import {
    Box,
    Container,
    Button,
    FormControlLabel,
    FormGroup,
    Checkbox,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { History_Container } from "../../../common/MainStyle";

import SingleSelection from "../../Components/ExamQuestion/SingleSelection";
import MultiSelection from "../../Components/ExamQuestion/MultiSelection";

const HistoryPaper = ({
    setLoading,
    setHistoryPage,
    HistoryPaperUUID,
    setHistoryPaperUUID,
    getParam,
    setParam,
}) => {
    const [PaperDetail, setPaperDetail] = useState({});
    const [PaperLoaded, setPaperLoaded] = useState(false);

    const handleReturnHistoryList = () => {
        setHistoryPage("List");
        setHistoryPaperUUID("");
        setParam({});
    };

    //檢查是否做對該題目
    const checkAnswer = (studentAnswer, rightAnswer) => {
        // 長度不對就是不正確
        if (studentAnswer.length !== rightAnswer.length) return false;

        // (單選) 答案不正確
        if (studentAnswer[0] !== rightAnswer[0]) return false;

        for (let i = 0; i < rightAnswer.length; i++)
            if (studentAnswer[i] !== rightAnswer[i]) return false;

        return true;
    };

    //取得考試內容(待修)
    useEffect(() => {
        setLoading(true);
        Connection.getCompleteExamSheet(
            localStorage.getItem("token"),
            "First"
        ).then(res => {
            setPaperDetail(res.data.result);
            setPaperLoaded(true);
            setLoading(false);
        });
    }, []);

    return (
        <Container sx={History_Container.Main_Container}>
            {PaperLoaded && (
                <Button
                    variant="contained"
                    endIcon={<ArrowBackIosIcon />}
                    onClick={handleReturnHistoryList}
                    sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: "1000",
                        width: 150,
                        height: 50,
                    }}
                >
                    返回
                </Button>
            )}
            {PaperLoaded && (
                <Box
                    sx={{
                        margin: "20px auto",
                        padding: "50px 35px",
                        borderRadius: "5px",
                        boxShadow: "1px 1px 5px 2px rgba(0, 0, 0, 0.4)",
                        textAlign: "Center",
                        fontSize: 24,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Box>{`作答題卷:${PaperDetail.paper_type}`}</Box>
                    <Box>{`作答時間:${PaperDetail.answered_on}`}</Box>
                    <Box
                        sx={{
                            fontSize: 45,
                            fontWeight: "bolder",
                        }}
                    >{`分數:${PaperDetail.score} / ${PaperDetail.total_score}`}</Box>
                </Box>
            )}
            {PaperLoaded &&
                PaperDetail.question_list.map((value, INDEX) => {
                    const options = [
                        value.options1,
                        value.options2,
                        value.options3,
                        value.options4,
                        value.options5,
                    ];

                    const studentAnswer = value.student_answer.split(",");
                    const rightAnswer = value.answer.split(",");

                    return (
                        <Box
                            id={value.uuid}
                            key={INDEX + 1}
                            sx={{
                                margin: "20px auto",
                                padding: "10px 35px",
                                borderRadius: "5px",
                                boxShadow: checkAnswer(
                                    studentAnswer,
                                    rightAnswer
                                )
                                    ? "1px 1px 7px 2px rgba(0,200,0,0.7)"
                                    : "1px 1px 7px 2px rgba(200,0,0,0.7)",
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
                                    Type={"Review"}
                                    uuid={value.uuid}
                                    options={options}
                                    studentAnswer={studentAnswer}
                                    rightAnswer={rightAnswer}
                                    checkAnswer={checkAnswer}
                                />
                            )}
                            {value.category === 2 && (
                                <MultiSelection
                                    Type={"Review"}
                                    uuid={value.uuid}
                                    options={options}
                                    studentAnswer={studentAnswer}
                                    rightAnswer={rightAnswer}
                                    checkAnswer={checkAnswer}
                                />
                            )}
                        </Box>
                    );
                })}
        </Container>
    );
};

export default HistoryPaper;

import { useEffect, useState } from "react";
import $ from "jquery";

import { Connection } from "../../../common/axiosConnect";

import {
    Container,
    Button,
    Box,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormGroup,
    Checkbox,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const HistoryRetest = ({
    setLoading,
    setHistoryPage,
    HistoryPaperUUID,
    setHistoryPaperUUID,
    getParam,
    setParam,
}) => {
    const [PaperDetail, setPaperDetail] = useState({});
    const [PaperLoaded, setPaperLoaded] = useState(false);

    // 返回
    const handleReturnHistoryList = () => {
        setHistoryPage("List");
        setHistoryPaperUUID("");
        setParam({});
    };

    // 考試專用區域---------------------------------------------
    const [paperAnswerSheet, setPaperAnswerSheet] = useState([]);
    //取得題目的uuid
    const questionUUID = () => {
        let returnAry = [];
        for (const { question_id } of PaperDetail.question_list) {
            returnAry.push(question_id);
        }
        return returnAry;
    };
    //設定選擇題目
    const handleSelectingOptions = e => {
        // Type => 複選(checkbox)or單選(radio), Name => 題目之uuid, Value => 選擇之 value 值
        const Type = e.currentTarget.type;
        const Name = e.currentTarget.name;
        const Value = e.currentTarget.value;

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
        setPaperAnswerSheet(paperAnswerSheet);
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
    const handleSubmitPaper = () => {
        PaperDetail.question_list.map((value, index) => {
            console.log(paperAnswerSheet[index], value.answer);
            if (checkAnswer(paperAnswerSheet[index], value.answer)) {
                $(`#${value.question_id}`).css(
                    "boxShadow",
                    "1px 1px 7px 2px rgba(0,200,0,0.7)"
                );
            } else {
                $(`#${value.question_id}`).css(
                    "boxShadow",
                    "1px 1px 7px 2px rgba(200,0,0,0.7)"
                );
            }
        });
    };
    //-------------------------------------------------------
    //取得考試內容(待修)
    useEffect(() => {
        setLoading(true);
        Connection.getCompleteExamSheet(
            localStorage.getItem("token"),
            "First"
        ).then(res => {
            setPaperDetail(res.data.result);
            setPaperAnswerSheet(
                new Array(res.data.result.question_list.length).fill("")
            );
            setPaperLoaded(true);
            setLoading(false);
        });
    }, []);

    const optionGroupStyle = {
        padding: "10px 40px",
        fontSize: 6,
        margin: "10px auto",
    };

    return (
        <Container
            sx={{
                margin: "10px auto",
                padding: "10px 35px",
                width: "95%",
                height: "95%",
                overflowY: "scroll",
            }}
        >
            {PaperLoaded && (
                <Button
                    variant="contained"
                    endIcon={<ArrowBackIosIcon />}
                    onClick={handleReturnHistoryList}
                >
                    返回
                </Button>
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
                    return (
                        <Box
                            id={value.question_id}
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
                                <FormControl sx={optionGroupStyle}>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name={value.question_id}
                                        onChange={handleSelectingOptions}
                                    >
                                        {options.map((option, index) => {
                                            if (option !== null) {
                                                return (
                                                    <FormControlLabel
                                                        key={index + 1}
                                                        value={index + 1}
                                                        control={
                                                            <Radio size="small" />
                                                        }
                                                        label={option}
                                                    />
                                                );
                                            }
                                        })}
                                    </RadioGroup>
                                </FormControl>
                            )}
                            {value.category === 2 && (
                                <FormGroup
                                    sx={optionGroupStyle}
                                    name={value.question_id}
                                >
                                    {options.map((option, index) => {
                                        return (
                                            <FormControlLabel
                                                key={index + 1}
                                                value={index + 1}
                                                control={<Checkbox />}
                                                label={option}
                                                name={value.question_id}
                                                onChange={
                                                    handleSelectingOptions
                                                }
                                            />
                                        );
                                    })}
                                </FormGroup>
                            )}
                        </Box>
                    );
                })}
            <Button
                variant="contained"
                sx={{
                    margin: "50px auto",
                    width: 350,
                }}
                size="large"
                onClick={handleSubmitPaper}
            >
                寫完了，交卷!
            </Button>
        </Container>
    );
};

export default HistoryRetest;

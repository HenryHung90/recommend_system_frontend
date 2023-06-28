import { useState, useEffect } from "react";
import React from "react";

import { Connection } from "../../../../common/axiosConnect";

import {
    Box,
    Button,
    Container,
    Checkbox,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    FormControlLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";

// 題目Dialog
const QuestionDialog = ({ open, close, setLoading, questionDetail, type }) => {
    //題目敘述
    const [questionDescription, setQuestionDescription] = useState("");

    //類型（單選多選）
    const [questionType, setQuestionType] = useState("1");
    const handleChangeQuestionType = e => {
        setQuestionType(e.target.value.toString());
    };
    // 所有屬性
    //major_question_type 主屬性
    //question_type 小屬性
    const [questionAttributeType, setQuestionAttributeType] = useState({
        major_question_type: [],
        question_type: []
    })
    //把 type Id 轉換為 Name
    const typeId2Name = typeId => {
        if (typeId === "")
            return ""

        for (const { type_id } of questionAttributeType.question_type) {
            if (typeId === type_id)
                return `${type.type1} ${type.type2 === null ? '' : " => " + type.type2} ${type.type3 === null ? '' : " => " + type.type3} ${type.type4 === null ? '' : " => " + type.type4}`
        }
    }
    const mainType2Name = mainType => {
        for (const { type, type_name } of questionAttributeType.major_question_type) {
            if (mainType === type)
                return type_name

        }
    }
    //找出該type 的 maintype (options => 1 找 Id , 2 找 Name)
    const findMainType = (typeId, options) => {
        for (const { type_id, type1 } of questionAttributeType.question_type) {
            if (typeId === type_id) {
                for (const { type, type_name } of questionAttributeType.major_question_type) {
                    if (type1 === type_name) {
                        if (options === 1)
                            return type
                        if (options === 2)
                            return type_name
                    }
                }
            }
        }
    }

    const [questionMainAttribute, setQuestionMainAttribute] = useState("")
    //屬性 (html css javascript)
    const [questionAttribute, setQuestionAttribute] = useState("");
    const handleChangequestionAttribute = e => {
        setQuestionAttribute(e.target.value.toString());
    };
    //難易度
    const [questionDifficulty, setQuestionDifficulty] = useState("1");
    const handleChangeQuestionDifficulty = e => {
        setQuestionDifficulty(e.target.value.toString());
    };
    //正確答案
    const [correctOption, setCorrectOption] = useState("");
    const handleCorrectAnswerChange = e => {
        const Value = e.target.value;
        let Answers = correctOption.split(",");
        if (Answers[0] == "") Answers.shift();
        // 確認當前題目的 index 位置 => 多選是否已經選過
        Answers.includes(Value)
            ? (Answers = Answers.filter(answer => answer !== Value))
            : Answers.push(Value);
        //進行升冪排序
        Answers.sort((a, b) => a - b);
        Answers = Answers.join(",");
        setCorrectOption(Answers);
    };
    //選項內容
    const [option_1, setOption_1] = useState("");
    const [option_2, setOption_2] = useState("");
    const [option_3, setOption_3] = useState("");
    const [option_4, setOption_4] = useState("");
    const [option_5, setOption_5] = useState("");


    //取得所有屬性
    useEffect(() => {
        Connection.getQuestionType(localStorage.getItem("token")).then(res => {
            setQuestionAttributeType(res.data.result[0])
            console.log(res.data.result[0])
        })
    }, [])

    useEffect(() => {
        if (type === "paper") {
            setQuestionDescription(questionDetail.question);
            setQuestionType(questionDetail.category === "單選" ? "1" : "2");
            setQuestionMainAttribute(findMainType(questionDetail.type_id, 1))
            setQuestionAttribute(questionDetail.type_id);
            setQuestionDifficulty(questionDetail.difficulty)
            setCorrectOption(questionDetail.answer);
            setOption_1(questionDetail.options1);
            setOption_2(questionDetail.options2);
            setOption_3(questionDetail.options3);
            setOption_4(questionDetail.options5 === -1 ? "" : questionDetail.options5);
            setOption_5(questionDetail.options5 === -1 ? "" : questionDetail.options5);
        } else {
            setQuestionDescription("");
            setQuestionType("");
            setQuestionAttribute("");
            setQuestionDifficulty("");
            setCorrectOption("");
            setOption_1("");
            setOption_2("");
            setOption_3("");
            setOption_4("");
            setOption_5("");
        }
    }, [open]);

    //送出/修改問題
    const handleSubmitQuestion = () => {
        if (correctOption.split(",").length >= 2 && questionType !== "2")
            return window.alert("非多選題不得設定超過兩個答案!");

        if (questionDescription === "")
            return window.alert("題目敘述不得為空!");
        if (correctOption === "") return window.alert("正確答案不得為空!");

        const questionData = new FormData();
        questionData.append("image", new Image());
        questionData.append("question", questionDescription);
        questionData.append("options1", option_1);
        questionData.append("options2", option_2);
        questionData.append("options3", option_3);
        questionData.append("options4", option_4);
        questionData.append("options5", option_5);
        questionData.append("answer", correctOption);
        questionData.append("type_id", questionAttribute);
        if (type === "paper") {
            questionData.append("uid", questionDetail.uuid)
            questionData.append("question_type_id", questionMainAttribute)
        };
        questionData.append("difficulty", questionDifficulty);
        questionData.append("category", questionType);

        for (const [key, value] of questionData.entries())
            console.log(key, value);

        setLoading(true);
        if (type === "new") {
            Connection.submitNewQuestion(
                localStorage.getItem("token"),
                questionData
            ).then(res => {
                if (res.data.state) {
                    window.alert("success");
                    setLoading(false);
                    close();
                } else {
                    window.alert(res.data.msg);
                }
            });
        } else {
            Connection.editQuestion(
                localStorage.getItem("token"),
                questionData
            ).then(res => {
                if (res.data.state) {
                    window.alert("success");
                    setLoading(false);
                    close();
                } else {
                    window.alert(res.data.msg);
                }
            });
        }
    };

    //刪除問題
    const handleDeleteQuestion = () => {
        if (window.confirm("確定刪除該題目?")) {

            const questionData = new FormData();
            questionData.append("uid", questionDetail.uuid)
            questionData.append("question_type_id", questionMainAttribute)

            setLoading(true);
            Connection.deleteQuestion(localStorage.getItem("token"), questionData).then(res => {
                if (res.data.state) {
                    window.alert("success");
                    setLoading(false);
                    close();
                } else {
                    window.alert(res.data.msg);
                }
            })
        }
    };

    return (
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth={"md"}>
            <DialogTitle fontSize={36}>
                {type === "new" && "新增題目"}
            </DialogTitle>
            <DialogContent
                sx={{
                    padding: "10px 100px",
                }}
            >
                <DialogTitle textAlign={"center"}>基本設定</DialogTitle>
                <FormControl variant="standard" fullWidth margin="normal">
                    <TextField
                        variant="outlined"
                        label="題目敘述"
                        multiline
                        rows={4}
                        value={questionDescription}
                        onChange={e => setQuestionDescription(e.target.value)}
                    />
                    <FormHelperText id="my-helper-text">
                        請寫下完整題目敘述
                    </FormHelperText>
                </FormControl>
                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    <FormControl variant="standard" fullWidth margin="normal" sx={{ padding: '0 5px' }}>
                        <InputLabel>題目類型</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            value={questionType}
                            onChange={handleChangeQuestionType}
                            label="題目類型"
                        >
                            <MenuItem value={"1"}>單選</MenuItem>
                            <MenuItem value={"2"}>多選</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" fullWidth margin="normal" sx={{ padding: '0 5px' }}>
                        <InputLabel>題目屬性</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            value={questionAttribute}
                            onChange={handleChangequestionAttribute}
                            label="題目類型"
                        >
                            {
                                type === 'new' && questionAttributeType.question_type.map(type => {
                                    return (
                                        <MenuItem value={type.type_id}>{`${type.type1} ${type.type2 === null ? '' : " => " + type.type2} ${type.type3 === null ? '' : " => " + type.type3} ${type.type4 === null ? '' : " => " + type.type4}`}</MenuItem>
                                    )
                                })
                            }
                            {
                                type === 'paper' && questionAttributeType.question_type.map(type => {
                                    if (type.type1 === mainType2Name(questionMainAttribute)) {
                                        return (
                                            <MenuItem value={type.type_id}>{`${type.type1} ${type.type2 === null ? '' : " => " + type.type2} ${type.type3 === null ? '' : " => " + type.type3} ${type.type4 === null ? '' : " => " + type.type4}`}</MenuItem>
                                        )
                                    }
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" fullWidth margin="normal" sx={{ padding: '0 5px' }}>
                        <InputLabel>題目難易度</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            value={questionDifficulty}
                            onChange={handleChangeQuestionDifficulty}
                            label="題目難易度"
                        >
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <DialogTitle textAlign={"center"}>選擇輸入</DialogTitle>
                {[
                    { value: option_1, set: setOption_1, count: questionDetail.options1_count },
                    { value: option_2, set: setOption_2, count: questionDetail.options2_count },
                    { value: option_3, set: setOption_3, count: questionDetail.options3_count },
                    { value: option_4, set: setOption_4, count: questionDetail.options4_count },
                    { value: option_5, set: setOption_5, count: questionDetail.options5_count },
                ].map((option, index) => {
                    return (
                        <Box sx={{ display: "flex" }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={index + 1}
                                        checked={correctOption
                                            .split(",")
                                            .includes((index + 1).toString())}
                                        onChange={handleCorrectAnswerChange}
                                    />
                                }
                                label={"正解"}
                                sx={{ width: 100 }}
                            />
                            <FormControl
                                variant="standard"
                                fullWidth
                                margin="normal"
                            >
                                <InputLabel>選項{index + 1}</InputLabel>
                                <Input
                                    type="text"
                                    value={option.value}
                                    onChange={e => option.set(e.target.value)}
                                />
                                <FormHelperText id="my-helper-text">
                                    不填視作無此選項
                                </FormHelperText>
                                {
                                    type === 'paper' &&
                                    <FormHelperText id="my-helper-text">
                                        {`選擇次數:${option.count}`}
                                    </FormHelperText>
                                }
                            </FormControl>
                        </Box>
                    );
                })}
            </DialogContent>
            <DialogActions>
                {type === "paper" && (
                    <Button onClick={handleDeleteQuestion} color="error">
                        刪除此題目
                    </Button>
                )}
                <Button onClick={handleSubmitQuestion}>
                    {type === "new" && "送出"}
                    {type === "paper" && "修改"}
                </Button>
                <Button onClick={close}>取消</Button>
            </DialogActions>
        </Dialog>
    );
};

const Quizzes = ({ setLoading }) => {
    //所有題目(包含正確回答數、總回答數)
    const [paperQuestionQuery, setpaperQuestionQuery] = useState([]);

    // Dialog Open (新增題目)
    const [QuestionDialogOpen, setQuestionDialogOpen] = useState(false);
    const [paperQuestionDetail, setPaperQuestionDetail] = useState({});

    //Dialog 開啟哪一種 //new => 新增題目 //paper => 閱覽就題目
    const [dialogType, setDialogType] = useState("new");

    // DataGrid 欄位名稱
    const columns = [
        { field: "create_on", headerName: "建立時間", width: 170 },
        { field: "question", headerName: "題目", width: 350 },
        { field: "category", headerName: "分類", width: 100 },
        { field: "correct_nums", headerName: "正確數", width: 120 },
        { field: "answer_nums", headerName: "總答題數", width: 160 },
        { field: "wrong_rate", headerName: "錯誤率", width: 120 },
        { field: "uuid", headerName: "uuid", width: 120 },
    ];

    //查看題目Click
    const handlePaperQuestionClick = e => {
        setDialogType("paper");
        setPaperQuestionDetail(e.row);
        setQuestionDialogOpen(open => !open);
    };
    //新增題目Click
    const handleQuestionClick = e => {
        setDialogType("new");
        setQuestionDialogOpen(open => !open);
    };

    useEffect(() => {
        setLoading(true);
        // 取得總題數
        Connection.getQuestionDB(localStorage.getItem("token")).then(res => {
            if (res.data.state) {
                res.data.result.forEach((value, index) => {
                    value.id = index + 1;
                    value.category = value.category === 1 ? "單選" : "多選";
                    value.wrong_rate = CountingParsent(
                        value.answer_nums,
                        value.correct_nums
                    );
                });
                console.log(res.data.result)
                setpaperQuestionQuery(res.data.result);
                setLoading(false);
            } else {
                window.alert(res.data.result);
            }
            //answer_num 總回答數
            //correct_num 正確回答數
        });
    }, [dialogType]);

    return (
        <>
            <QuestionDialog
                open={QuestionDialogOpen}
                close={handleQuestionClick}
                setLoading={setLoading}
                questionDetail={paperQuestionDetail}
                type={dialogType}
            />
            <Container
                sx={{
                    overflowY: "auto",
                    height: "80vh",
                }}
            >
                <Box
                    sx={{
                        height: 50,
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleQuestionClick}
                    >
                        新增題目
                    </Button>
                </Box>
                <DataGrid
                    sx={{
                        height: "90%",
                    }}
                    rows={paperQuestionQuery}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 100 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 50, 100]}
                    disableColumnSelector
                    onRowClick={handlePaperQuestionClick}
                />
            </Container>
        </>
    );
};

//計算 parsent
function CountingParsent(answer_nums, correct_nums) {
    if (answer_nums === 0) {
        return "0%";
    }
    return (
        (((answer_nums - correct_nums) / answer_nums) * 100).toFixed(2) + "%"
    );
}

export default Quizzes;

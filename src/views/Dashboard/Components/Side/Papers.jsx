import { useState, useEffect } from "react";

import { Connection } from "../../../../common/axiosConnect";

import {
    Box,
    Container,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

import ChartComponent_Column from "../../../Components/Chart/ChartComponent_Column";

//分數區間Model
const ScoreDstributedModel = () => {
    let tempAry = [];
    for (let i = 0; i <= 10; i++) {
        if (i === 10) {
            tempAry.push({
                分數區間: `100分`,
                人數: 0,
            });
            continue;
        }
        tempAry.push({
            分數區間: `${i * 10}-${(i + 1) * 10 - 1}分`,
            人數: 0,
        });
    }

    return tempAry;
};

const PaperInformation = ({ open, close, setLoading, paperIndex }) => {
    // 學生總群集
    const [studentList, setStudentList] = useState([]);
    // 學生分班
    const [studentClassify, setStudentClassify] = useState({});
    // 該卷總平均
    const [paperAvgScore, setPaperAvgScore] = useState({});
    // 該卷平均題數
    const [paperAvgQuestionNum, setPaperAvgQuestionNum] = useState({});
    // 該卷平均答對題數
    const [paperAvgRightQuestion, setPaperAvgRightQuestion] = useState({});
    // 該卷分數分布
    const [paperScoreDistributed, setPaperScoreDistributed] = useState({});

    //儲存現在選擇班級
    const [selectedClassify, setSelectedClassify] = useState("all");

    // 點擊考卷後更新 studentList
    useEffect(() => {
        if (paperIndex === null) return;
        setLoading(true);
        Connection.getQuestionDB(
            localStorage.getItem("token"),
            "all_student",
            paperIndex
        ).then(res => {
            if (res.data.state) {
                setLoading(false);
                setStudentList(res.data.result);
                console.log(res.data);
            } else {
                window.alert(res.data.msg);
            }
        });
    }, [paperIndex]);

    //基於 studentList整理所有數據
    useEffect(() => {
        if (studentList.length === 0) return;

        //暫存學生用於分組
        const tempStudentClassify = {};
        //暫存班級分數加總
        const tempStudentAvgScore = { all: 0 };
        //暫存題數用於得出平均題目數
        const tempStudentAvgQuestionNum = { all: 0 };
        //暫存答對題數用於得出平均答對題目數
        const tempStudentAvgRightQuestion = { all: 0 };
        //暫存分數區間
        const tempStudentScoreDistributed = {
            all: ScoreDstributedModel(),
        };

        studentList.map((student, index) => {
            // 處理分班--------------------------------------------------------
            if (tempStudentClassify[student.class_type] === undefined) {
                //初始化班級
                tempStudentClassify[student.class_type] = {
                    class_type: student.class_type,
                    students: [],
                };
                //初始化分數
                tempStudentAvgScore[student.class_type] = 0;
                tempStudentAvgQuestionNum[student.class_type] = 0;
                tempStudentAvgRightQuestion[student.class_type] = 0;
                tempStudentScoreDistributed[student.class_type] =
                    ScoreDstributedModel();
            }

            tempStudentClassify[student.class_type].students.push(student);
            if (student.paper_index !== -1) {
                // 目前學生總數(扣除剛剛加進來的這位)
                const studentNum =
                    tempStudentClassify[student.class_type].students.length - 1;
                // 目前學生總分數
                const currentTotalScore =
                    tempStudentAvgScore[student.class_type] * studentNum;
                // 目前總題數
                const currentTotalQuestion =
                    tempStudentAvgQuestionNum[student.class_type] * studentNum;
                // 目前學生總答對題數
                const currentTotalRightQuestion =
                    tempStudentAvgRightQuestion[student.class_type] *
                    studentNum;

                // 分數累進加總並得出總平均
                tempStudentAvgScore[student.class_type] = (
                    (currentTotalScore + student.score) /
                    (studentNum + 1)
                ).toFixed(2);
                // 總題數累進加總並得出總平均
                tempStudentAvgQuestionNum[student.class_type] = (
                    (currentTotalQuestion + student.total_question) /
                    (studentNum + 1)
                ).toFixed(2);
                // 答對題數累進加總並得出總平均
                tempStudentAvgRightQuestion[student.class_type] = (
                    (currentTotalRightQuestion + student.answered_right) /
                    (studentNum + 1)
                ).toFixed(2);

                // 處理總分、平均題數、平均答對題數-------------------------------
                tempStudentAvgScore["all"] += student.score;
                tempStudentAvgQuestionNum["all"] += student.total_question;
                tempStudentAvgRightQuestion["all"] += student.answered_right;

                //處理分數區間--------------------------------------------------
                let studentScoreRange = (student.score / 10).toFixed(0) - 1;
                if (studentScoreRange < 0) studentScoreRange = 0;

                tempStudentScoreDistributed["all"][studentScoreRange]["人數"]++;
                tempStudentScoreDistributed[student.class_type][
                    studentScoreRange
                ]["人數"]++;
            }
            //-----------------------------------------------------------------
        });

        tempStudentAvgScore["all"] = (
            tempStudentAvgScore["all"] / studentList.length
        ).toFixed(2);
        tempStudentAvgQuestionNum["all"] = (
            tempStudentAvgQuestionNum["all"] / studentList.length
        ).toFixed(2);
        tempStudentAvgRightQuestion["all"] = (
            tempStudentAvgRightQuestion["all"] / studentList.length
        ).toFixed(2);

        setStudentClassify(tempStudentClassify);
        setPaperAvgScore(tempStudentAvgScore);
        setPaperAvgQuestionNum(tempStudentAvgQuestionNum);
        setPaperAvgRightQuestion(tempStudentAvgRightQuestion);
        setPaperScoreDistributed(tempStudentScoreDistributed);
    }, [studentList]);

    return (
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth={"md"}>
            <DialogTitle sx={{ fontSize: 36, textAlign: "center" }}>
                卷次 {paperIndex}
            </DialogTitle>
            <DialogActions
                sx={{ justifyContent: "left", padding: "15px 50px" }}
            >
                <FormControl
                    variant="standard"
                    sx={{
                        width: 200,
                    }}
                >
                    <InputLabel>班級選擇</InputLabel>
                    <Select
                        value={selectedClassify}
                        label="班級選擇"
                        onChange={e => setSelectedClassify(e.target.value)}
                    >
                        <MenuItem value={"all"}>全部</MenuItem>
                        {Object.keys(studentClassify).map(classValue => {
                            return (
                                <MenuItem value={classValue}>
                                    {classValue}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </DialogActions>
            <DialogContent
                sx={{
                    textAlign: "center",
                }}
            >
                {/* 重要資訊 */}
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    {[
                        {
                            name: "人數",
                            count:
                                selectedClassify === "all"
                                    ? studentList.length
                                    : studentClassify[selectedClassify].students
                                          .length,
                            label: "人",
                        },
                        {
                            name: "總平均",
                            count: paperAvgScore[selectedClassify],
                            label: "分",
                        },
                        {
                            name: "平均題數",
                            count: paperAvgQuestionNum[selectedClassify],
                            label: "題",
                        },
                        {
                            name: "平均正確題數",
                            count: paperAvgRightQuestion[selectedClassify],
                            label: "題",
                        },
                    ].map((value, index) => {
                        return (
                            <Card
                                key={index}
                                sx={{
                                    minWidth: 150,
                                    margin: "2px 10px",
                                    display: "inline-block",
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="p"
                                        component="div"
                                        color="gray"
                                        textAlign={"left"}
                                    >
                                        {value.name}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        component="div"
                                        textAlign={"center"}
                                    >
                                        {value.count}
                                    </Typography>
                                    <Typography
                                        variant="p"
                                        component="div"
                                        color="gray"
                                        textAlign={"right"}
                                    >
                                        {value.label}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Box>
                {/* 成績分布直方圖 */}
                <ChartComponent_Column
                    caption={"成績分布直方圖"}
                    dataSource={paperScoreDistributed[selectedClassify]}
                    series={["人數"]}
                    xAxisName={"分數區間"}
                    xAxisUnitInterval={1}
                    yAxisName={"人數"}
                    yAxisUnitInterval={10}
                    yAxisMinValue={0}
                    yAxisMaxValue={50}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>取消</Button>
            </DialogActions>
        </Dialog>
    );
};

// 考試卡片顯示
const ExamSheetCard = ({ examDetail, setPaperIndex, setPaperDialogOpen }) => {
    // 查看測驗
    const handleWatchExamSheet = paperIndex => {
        setPaperDialogOpen(true);
        setPaperIndex(paperIndex.toString());
    };

    return (
        <Card sx={{ maxWidth: 250 }}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    textAlign={"left"}
                >
                    {`卷 ${examDetail.paper_index}`}
                </Typography>
                <Typography variant="h4" component="div" textAlign={"center"}>
                    {examDetail.paper_type}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                <Button
                    size="small"
                    onClick={() => handleWatchExamSheet(examDetail.paper_index)}
                >
                    查看考卷
                </Button>
            </CardActions>
        </Card>
    );
};

const Papers = ({ setLoading }) => {
    // 儲存所有卷次
    const [paperList, setPaperList] = useState([]);
    // 現在點開哪一個卷次
    const [paperIndex, setPaperIndex] = useState(null);
    // 點開之Dialog 控制
    const [paperDialogOpen, setPaperDialogOpen] = useState(false);

    const handleClosePaperDialog = () => {
        setPaperDialogOpen(false);
        setPaperIndex(null);
    };

    useEffect(() => {
        setLoading(true);
        Connection.getQuestionDB(
            localStorage.getItem("token"),
            "all_paper_type"
        ).then(res => {
            if (res.data.state) {
                setPaperList(res.data.result);
                setLoading(false);
            } else {
                window.alert(res.data.msg);
            }
        });
    }, []);

    return (
        <Container
            sx={{
                display: "inline-block",
                overflowY: "auto",
                height: "80vh",
            }}
        >
            <PaperInformation
                open={paperDialogOpen}
                close={() => handleClosePaperDialog()}
                setLoading={setLoading}
                paperIndex={paperIndex}
            />
            {paperList.map((paper, index) => {
                return (
                    <ExamSheetCard
                        key={index}
                        examDetail={paper}
                        setPaperIndex={setPaperIndex}
                        setPaperDialogOpen={setPaperDialogOpen}
                    />
                );
            })}
        </Container>
    );
};

export default Papers;

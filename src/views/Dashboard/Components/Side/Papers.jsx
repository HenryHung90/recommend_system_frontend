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
import { DataGrid } from "@mui/x-data-grid";

import ChartComponent_Column from "../../../Components/Chart/ChartComponent_Column";
import ChartComponent_PieChart from "../../../Components/Chart/ChartComponent_PieChart";
import ChartComponent_Line from "../../../Components/Chart/ChartComponent_Line";

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

const StudentInformation = ({
    open,
    close,
    setLoading,
    paperIndex,
    studentInfo,
}) => {
    // 學生完整資訊(三種題型的答題次數、正確次數)
    const [studentTotalDetail, setStudentTotalDetail] = useState({});
    // 學生卷次資訊
    const [studentPaperInformation, setStudentPaperInformation] = useState([]);
    // 圓餅圖資訊
    const [studentPieChartInfomation, setStudentPieChartInfomation] = useState(
        []
    );

    // 學生資料下載
    useEffect(() => {
        if (paperIndex === null) return;
        if (studentInfo.student_id === undefined) return;

        Connection.getQuestionDB(
            localStorage.getItem("token"),
            "student_status",
            "",
            studentInfo.student_id
        ).then(res => {
            if (res.data.state) {
                let tempStudentTotalDetail =
                    res.data.result[0].student_detail[0];

                // 儲存總計統計資料
                tempStudentTotalDetail["total_answer"] =
                    tempStudentTotalDetail.answer_css +
                    tempStudentTotalDetail.answer_html +
                    tempStudentTotalDetail.answer_javascript;

                tempStudentTotalDetail["total_correct"] =
                    tempStudentTotalDetail.correct_css +
                    tempStudentTotalDetail.correct_html +
                    tempStudentTotalDetail.correct_javascript;

                tempStudentTotalDetail["correct_rate"] = (
                    (tempStudentTotalDetail.total_correct /
                        tempStudentTotalDetail.total_answer) *
                    100
                ).toFixed(2);

                // 儲存圓餅圖用資訊
                let tempStudentPieChartInfomation = [];
                tempStudentPieChartInfomation.push({
                    名稱: "html",
                    答題次數: tempStudentTotalDetail.answer_html,
                    正確次數: tempStudentTotalDetail.correct_html,
                });
                tempStudentPieChartInfomation.push({
                    名稱: "css",
                    答題次數: tempStudentTotalDetail.answer_css,
                    正確次數: tempStudentTotalDetail.correct_css,
                });

                tempStudentPieChartInfomation.push({
                    名稱: "javascript",
                    答題次數: tempStudentTotalDetail.answer_javascript,
                    正確次數: tempStudentTotalDetail.correct_javascript,
                });

                // 儲存線條圖用資訊
                let tempStudentPaperInfomation = [];
                res.data.result[1].student_paper.map(value => {
                    tempStudentPaperInfomation.push({
                        分數: value.score,
                        交卷時間: value.answered_on,
                        類型: value.paper_type,
                        卷次: value.paper_index,
                    });
                });
                setStudentPieChartInfomation(tempStudentPieChartInfomation);
                setStudentTotalDetail(tempStudentTotalDetail);
                setStudentPaperInformation(tempStudentPaperInfomation);
            } else {
                window.alert(res.data.msg);
            }
        });
    }, [open]);

    return (
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth={"lg"}>
            <DialogTitle sx={{ fontSize: 36 }}>
                {studentInfo.class_type} | {studentInfo.ACCOUNT} |{" "}
                {studentInfo.NAME}
            </DialogTitle>
            <DialogContent
                sx={{
                    textAlign: "center",
                }}
            >
                <DialogTitle>統計資料</DialogTitle>
                {/* 重要資訊 */}
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    {[
                        {
                            name: "總答題數",
                            count: studentTotalDetail["total_answer"],
                            label: "題",
                        },
                        {
                            name: "總正確數",
                            count: studentTotalDetail["total_correct"],
                            label: "題",
                        },
                        {
                            name: "總正確率",
                            count: studentTotalDetail["correct_rate"],
                            label: "%",
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
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <ChartComponent_PieChart
                        caption={"題目回答數"}
                        dataSource={studentPieChartInfomation}
                        series={[
                            { dataField: "答題次數", displayText: "名稱" },
                        ]}
                    />
                    <ChartComponent_PieChart
                        caption={"題目正確數"}
                        dataSource={studentPieChartInfomation}
                        series={[
                            { dataField: "正確次數", displayText: "名稱" },
                        ]}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <ChartComponent_Line
                        caption={"歷次成績"}
                        dataSource={studentPaperInformation}
                        series={[{dataField:"分數", displayText: "分數"}]}
                        xAxisName={"卷次"}
                        xAxisUnitInterval={1}
                        yAxisName={"分數"}
                        yAxisUnitInterval={10}
                        yAxisMinValue={0}
                        yAxisMaxValue={100}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>取消</Button>
            </DialogActions>
        </Dialog>
    );
};

//考卷內容詳情
const PaperInformation = ({
    open,
    close,
    setLoading,
    paperIndex,
    setStudentInfo,
    setStudentDialogOpen,
}) => {
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

    // DataGrid 欄位名稱
    const columns = [
        { field: "class_type", headerName: "班級", width: 100 },
        { field: "ACCOUNT", headerName: "學號", width: 130 },
        { field: "NAME", headerName: "姓名", width: 120 },
        { field: "answered_on", headerName: "答題時間", width: 200 },
        { field: "total_question", headerName: "總題數", width: 100 },
        { field: "answered_right", headerName: "答對題數", width: 100 },
        { field: "score", headerName: "分數", width: 120 },
    ];
    const handleStudentsInfoClick = e => {
        setStudentInfo(e.row);
        setStudentDialogOpen(true);
    };

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
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth={"lg"}>
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
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <ChartComponent_Column
                        caption={"成績分布"}
                        dataSource={paperScoreDistributed[selectedClassify]}
                        series={["人數"]}
                        xAxisName={"分數區間"}
                        xAxisUnitInterval={1}
                        yAxisName={"人數"}
                        yAxisUnitInterval={10}
                        yAxisMinValue={0}
                        yAxisMaxValue={50}
                    />
                </Box>
                {/* 學生列表 */}
                <Box>
                    <DataGrid
                        rows={
                            selectedClassify === "all"
                                ? studentList
                                : studentClassify[selectedClassify].students
                        }
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        getRowId={row => row.student_id}
                        pageSizeOptions={[5, 10, 50, 100]}
                        disableColumnSelector
                        onRowClick={handleStudentsInfoClick}
                    />
                </Box>
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
    // 點開之 paper Dialog 控制
    const [paperDialogOpen, setPaperDialogOpen] = useState(false);
    // 點開之 student Dialog 控制
    const [studentDialogOpen, setStudentDialogOpen] = useState(false);
    // 學生資訊
    const [studentInfo, setStudentInfo] = useState({});
    // 關閉 paperInformation 動作
    const handleClosePaperDialog = () => {
        setPaperDialogOpen(false);
        setPaperIndex(null);
    };
    const handleCloseStudentDialog = () => {
        setStudentDialogOpen(false);
        setStudentInfo({});
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
            <StudentInformation
                open={studentDialogOpen}
                close={() => handleCloseStudentDialog()}
                setLoading={setLoading}
                paperIndex={paperIndex}
                studentInfo={studentInfo}
            />
            <PaperInformation
                open={paperDialogOpen}
                close={() => handleClosePaperDialog()}
                setLoading={setLoading}
                paperIndex={paperIndex}
                setStudentInfo={setStudentInfo}
                setStudentDialogOpen={setStudentDialogOpen}
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

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Connection } from "../../../common/axiosConnect";

import {
    Container,
    Box,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from "@mui/material";

// 考試卡片顯示
const ExamSheetCard = ({
    examDetail,
    AlertLog,
    setHistoryPage,
    setHistoryPaperUUID,
}) => {
    const [getParams, setParam] = useSearchParams();

    // 查看測驗
    const handleWatchExamSheet = paperIndex => {
        // AlertLog("通知", "目前僅提供成績查詢!十分抱歉!");
        setHistoryPage("Paper");
        setHistoryPaperUUID(paperIndex);
        setParam({
            page: "Paper",
            paperIndex: paperIndex,
        });
    };
    // 重新測驗
    const handleRetestExamSheet = paperIndex => {
        // AlertLog("通知", "目前僅提供成績查詢!十分抱歉!");
        setHistoryPage("Retest");
        setHistoryPaperUUID(paperIndex);
        setParam({
            page: "Retest",
            paperIndex: paperIndex,
        });
    };

    return (
        <Card sx={{ maxWidth: 250 }}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    textAlign={"center"}
                >
                    {`測驗時間:${examDetail.answered_on}`}
                </Typography>
                <Typography variant="h4" component="div" textAlign={"center"}>
                    {examDetail.paper_type}
                </Typography>
                <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                    textAlign={"center"}
                >
                    {`分數:${examDetail.score}/${examDetail.total_score}`}
                </Typography>
                <Typography variant="body2" textAlign={"center"}>
                    {"testing"}
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
                    觀看作答
                </Button>
                <Button
                    size="small"
                    onClick={() =>
                        handleRetestExamSheet(examDetail.paper_index)
                    }
                >
                    重複測驗
                </Button>
            </CardActions>
        </Card>
    );
};

const HistoryList = ({
    setLoading,
    AlertLog,
    setHistoryPage,
    setHistoryPaperUUID,
}) => {
    // 取得所有考試歷史並儲存
    const [ExamHistory, setExamHistory] = useState([]);
    useEffect(() => {
        setLoading(true);
        Connection.getAllCompleteExamSheets(localStorage.getItem("token")).then(
            res => {
                if (res.data.state) {
                    setExamHistory(res.data.result);
                    setLoading(false);
                } else {
                    window.alert(res.data.msg);
                }
            }
        );
    }, []);

    return (
        <>
            <Box
                sx={{
                    fontSize: 48,
                    fontWeight: "bolder",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: "1500px !important",
                    marginTop: 2,
                }}
            >
                歷史紀錄
            </Box>
            <Container
                sx={{
                    display: "inline-block",
                    width: "100%",
                    height: "85vh",
                    maxWidth: "1500px !important",
                    padding: "30px 50px",
                    borderRadius: 2,
                    boxShadow: "1px 0 3px 1px rgba(0, 0, 0, 0.4)",
                }}
            >
                {ExamHistory.map((examDetail, index) => {
                    return (
                        <ExamSheetCard
                            key={index}
                            examDetail={examDetail}
                            AlertLog={AlertLog}
                            setHistoryPage={setHistoryPage}
                            setHistoryPaperUUID={setHistoryPaperUUID}
                        />
                    );
                })}
            </Container>
        </>
    );
};

export default HistoryList;

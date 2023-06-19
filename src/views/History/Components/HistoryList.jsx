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
    const handleWatchExamSheet = paperId => {
        // AlertLog("通知", "目前僅提供成績查詢!十分抱歉!");
        setHistoryPage("Paper");
        setHistoryPaperUUID(paperId);
        setParam({
            page: "Paper",
            uuid: paperId,
        });
    };
    // 重新測驗
    const handleRetestExamSheet = paperId => {
        // AlertLog("通知", "目前僅提供成績查詢!十分抱歉!");
        setHistoryPage("Retest");
        setHistoryPaperUUID(paperId);
        setParam({
            page: "Retest",
            uuid: paperId,
        });
    };

    return (
        <Card sx={{ maxWidth: 250 }}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {`測驗時間:${examDetail.answered_on}`}
                </Typography>
                <Typography variant="h5" component="div">
                    {examDetail.paper_type}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {`分數:${examDetail.score}/${examDetail.total_score}`}
                </Typography>
                <Typography variant="body2">{examDetail.paper_id}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => handleWatchExamSheet(examDetail.paper_id)}
                >
                    觀看作答
                </Button>
                <Button
                    size="small"
                    onClick={() => handleRetestExamSheet(examDetail.paper_id)}
                >
                    重複測驗
                </Button>
            </CardActions>
        </Card>
    );
};

const HistoryList = ({ AlertLog, setHistoryPage, setHistoryPaperUUID }) => {
    // 取得所有考試歷史並儲存
    const [ExamHistory, setExamHistory] = useState([]);
    useEffect(() => {
        Connection.getAllCompleteExamSheets(localStorage.getItem("token")).then(
            res => {
                setExamHistory(res.data.result);
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

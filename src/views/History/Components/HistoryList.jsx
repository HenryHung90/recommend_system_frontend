import { useState, useEffect } from "react";

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

const ExamSheetCard = ({ examDetail, AlertLog }) => {
    const handleWatchExamSheet = () => {
        AlertLog("通知", "目前僅提供成績查詢!十分抱歉!");
    };
    const handleRetestExamSheet = () => {
        AlertLog("通知", "目前僅提供成績查詢!十分抱歉!");
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
                <Button size="small" onClick={handleWatchExamSheet}>
                    觀看作答
                </Button>
                <Button size="small" onClick={handleRetestExamSheet}>
                    重複測驗
                </Button>
            </CardActions>
        </Card>
    );
};

const HistoryList = ({ AlertLog }) => {
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
                            examDetail={examDetail}
                            AlertLog={AlertLog}
                        />
                    );
                })}
            </Container>
        </>
    );
};

export default HistoryList;

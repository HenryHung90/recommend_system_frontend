import { Container, Box, Button } from "@mui/material";

import { handleStartExam } from "../../../common/examHandleEvent";

const Intro = ({ setExamStatus, AlertLog, Loading, setQuestionQuery }) => {
    const IntroList = [
        "1️⃣、 在考試期間，請避免上網查詢資料，會造成偏差。",
        "2️⃣、 考試時請避免同時登入並開啟超過一該網站。",
        "3️⃣、 請務必在考試時間內做完並送出。",
        "4️⃣、 請務必盡你所能回答題目，加油！",
    ];

    return (
        <Container
            sx={{
                width: "100%",
                height: "100%",
                boxShadow: "1px 0 5px rgba(0, 0, 0, 0.5)",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    fontSize: "60px",
                    fontWeight: "bolder",
                    textAlign: "center",
                    userSelect: "none",
                }}
            >
                <Box
                    sx={{
                        letterSpacing: 30,
                        paddingLeft: 4,
                    }}
                >
                    測驗系統
                </Box>
                <Box
                    sx={{
                        fontSize: "50px",
                    }}
                >
                    Exam System
                </Box>
            </Box>
            <Box
                sx={{
                    fontSize: 24,
                    marginTop: "5%",
                    fontWeight: 600,
                }}
            >
                🌏 在開始之前，請先詳閱以下資訊：
            </Box>
            <Box
                sx={{
                    borderRadius: 5,
                    fontSize: 18,
                    marginTop: "2%",
                    padding: "50px 80px",
                    lineHeight: 2,
                    boxShadow: "1px 0 5px rgba(64,54,47)",
                }}
            >
                {IntroList.map((value, index) => {
                    return <Box>{value}</Box>;
                })}
            </Box>
            <Box sx={{ marginTop: "5%" }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() =>
                        handleStartExam(
                            AlertLog,
                            Loading,
                            setQuestionQuery,
                            setExamStatus
                        )
                    }
                >
                    準備好了，開始測驗
                </Button>
            </Box>
        </Container>
    );
};

export default Intro;

import { Connection } from './axiosConnect'

// 開始考試
const handleStartExam = (AlertLog, Loading, setQuestionQuery, setExamStatus) => {
    AlertLog("通知", "即將開始測驗！請勿重整或重複開啟該網站！");
    Loading(true);

    Connection.checkExamStatus(localStorage.getItem("token")).then(res => {
        if (res.data.state) {
            Connection.requestExamSheet(
                localStorage.getItem("token"),
                "First"
            ).then(res => {
                if (!res.data.state) {
                    AlertLog("通知", res.data.msg);
                    Loading(false);
                    return;
                }
                // 設定 QuestionQuery
                setQuestionQuery(res.data.result);
                localStorage.setItem(
                    "questionQuery",
                    JSON.stringify(res.data.result)
                );
                setTimeout(() => {
                    Loading(false);
                    setExamStatus("Examming");
                }, 1000);
            });
        }
    });
    //Testing
    // setTimeout(() => {
    //     Loading(false);
    //     setExamStatus("Examming");
    // }, 3000);
};
// set Localstorage setItem 控制
const isLocalStorageSetOpen = async (Status, Original) => {
    Status
        ? localStorage.setItem = Original
        : localStorage.setItem = () => {
            window.alert("禁止調適 Localstorage 資料")
            console.log("Plz do not modifiy the localStorage");
        }
}
// 送出答案卷
const submitPaperSheet = (AlertLog, Loading, setExamStatus) => {
    const paper_id = JSON.parse(
        localStorage.getItem("questionQuery")
    ).paper_id;
    const answer_list = JSON.parse(
        localStorage.getItem("paperAnswerSheet")
    );
    const paper_type = JSON.parse(
        localStorage.getItem("questionQuery")
    ).paper_type;

    Connection.submitExamSheet(
        localStorage.getItem("token"),
        paper_id,
        answer_list,
        paper_type
    ).then(res => {
        if (res.data.state) {
            AlertLog("通知", "交卷完成!");
            Loading(false);
            localStorage.removeItem("questionQuery");
            localStorage.removeItem("paperAnswerSheet");
            localStorage.removeItem("Testing");
            setExamStatus("Intro");
        }
    });
};
// 按下交卷檢查
const handleSubmitPaper = (AlertLog, Loading, setExamStatus) => {
    const paperAnswerSheet = JSON.parse(
        localStorage.getItem("paperAnswerSheet")
    );
    const isComplete = paperAnswerSheet.includes("");

    if (isComplete) {
        AlertLog("通知", "尚有題目未完成!");
        return;
    }
    if (window.confirm("確認答案無誤，要交卷了嗎?")) {
        submitPaperSheet(AlertLog, Loading, setExamStatus);
    }
};

export { handleStartExam, isLocalStorageSetOpen, submitPaperSheet, handleSubmitPaper }
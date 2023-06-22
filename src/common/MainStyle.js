const Main_Container = {
    Main_Container: () => {
        return (
            {
                width: "100vw",
                height: "100vh",
                display: "flex",
                maxWidth: "none !important",
                margin: "0 !important",
                padding: "0  !important",
            }
        )
    },
    Nav_Box: (NavBarOpen) => {
        return (
            {
                position: "absolute",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "rgba(0,0,0,0.5)",
                opacity: NavBarOpen ? "1" : "0",
                transitionDuration: "0.5s",
                zIndex: NavBarOpen ? "999" : "-100",
            }
        )
    }
}

const History_Container = {
    Main_Container: {
        margin: "10px auto",
        padding: "10px 35px",
        width: "95%",
        height: "95%",
        overflowY: "scroll",
    },
    // 檢測回答是否正確，該題正確答案會顯示綠色，否則正確答案顯示紅色
    optionRightAnswerBackground: (IsAnswer, IsStudentRightAnswer) => {
        return (
            {
                backgroundColor:
                    IsAnswer
                        ? IsStudentRightAnswer
                            ? "rgba(100,255,100,0.5)"
                            : "rgba(255,100,100,0.5)"
                        : "none",
                borderRadius: 2,
            }
        )
    },
    // 題目外框
    optionGroupStyle: {
        padding: "10px 40px",
        fontSize: 6,
        margin: "10px auto",
    }
}

const Exam_Container = {
    // 題目外框
    optionGroupStyle: {
        padding: "10px 40px",
        fontSize: 6,
        margin: "10px auto",
    },
}





export { Main_Container, History_Container, Exam_Container }
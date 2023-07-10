import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Container } from "@mui/material";

import QuizIcon from "@mui/icons-material/Quiz";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";

import Nav from "./Side/Nav";
import Home from "./Side/Home";
import Quizzes from "./Side/Quizzes";
import Papers from "./Side/Papers";
import Students from "./Side/Students";

const MainDashboard = ({ UserName, setLoading, handelAlertLogSetting }) => {
    const [NavBar, setNavBarOpen] = useState(false);
    const [page, setPage] = useState("Home");
    const [getParam, setParam] = useSearchParams();

    useEffect(() => {
        const Page = getParam.get("page");
        if (Page !== null) setPage(Page);
    }, []);

    // 頁面
    const ListDetail = [
        {
            Title: "主畫面",
            Icon: <HomeIcon />,
            Page: "Home",
        },
        {
            Title: "題庫總覽",
            Icon: <QuizIcon />,
            Page: "Quizzes",
        },
        {
            Title: "卷次查詢",
            Icon: <FindInPageIcon />,
            Page: "Papers",
        },
        {
            Title: "學生管理",
            Icon: <GroupIcon />,
            Page: "Students",
        },
    ];

    return (
        <Container
            sx={{
                maxWidth: "100vw !important",
                height: "100vh",
                overflow: "hidden",
                padding: "0 !important",
            }}
        >
            {/* Nav */}
            <Nav
                NavBar={NavBar}
                setNavBarOpen={setNavBarOpen}
                setPage={setPage}
                setParam={setParam}
                ListDetail={ListDetail}
            />
            {/* Main_Container */}
            <Container sx={{ padding: "25px 0" }}>
                {page === "Home" && (
                    <Home
                        UserName={UserName}
                        setPage={setPage}
                        setParam={setParam}
                        setLoading={setLoading}
                        ListDetail={ListDetail}
                    />
                )}
                {page === "Quizzes" && <Quizzes setLoading={setLoading} />}
                {page === "Papers" && <Papers setLoading={setLoading} />}
                {page === "Students" && <Students setLoading={setLoading} />}
            </Container>
        </Container>
    );
};

export default MainDashboard;

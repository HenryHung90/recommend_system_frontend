import { useState } from "react";

import { Container } from "@mui/material";

import Nav from "./Side/Nav";
import Home from "./Side/Home";
import Quizzes from "./Side/Quizzes";
import Papers from "./Side/Papers";
import Students from "./Side/Students";

const MainDashboard = ({ UserName, paperQuestionQuery }) => {
    const [NavBar, setNavBarOpen] = useState(false);
    const [page, setPage] = useState("Home");

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
            />
            {/* Main_Container */}
            <Container sx={{ padding: "25px 0" }}>
                {page === "Home" && <Home UserName={UserName} />}
                {page === "Quizzes" && (
                    <Quizzes paperQuestionQuery={paperQuestionQuery} />
                )}
                {page === "Papers" && <Papers />}
                {page === "Students" && <Students />}
            </Container>
        </Container>
    );
};

export default MainDashboard;

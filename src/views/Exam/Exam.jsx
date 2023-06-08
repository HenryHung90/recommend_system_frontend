import { useState } from "react";

import { Box, Fade, Container } from "@mui/material";

import { Nav } from "../Compnents/Nav/Nav";
import Intro from "./Compnents/Intro";

const Exam = ({ UserName }) => {
    const [NavBarOpen, setNavBarOpen] = useState(false);

    return (
        <Fade in={true} timeout={1200}>
            <Container
                sx={{
                    width: "100vw",
                    maxWidth: "none !important",
                    display: "flex",
                    height: "100vh",
                    margin: "0 !important",
                    padding: "0  !important",
                }}
            >
                <Nav
                    NavBarOpen={NavBarOpen}
                    setNavBarOpen={setNavBarOpen}
                    UserName={UserName}
                />
                {/* Block區塊 */}
                <Box
                    sx={{
                        position: "absolute",
                        width: "100vw",
                        height: "100vh",
                        overflow: "hidden",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        opacity: NavBarOpen ? "1" : "0",
                        transitionDuration: "0.5s",
                        zIndex: NavBarOpen ? "999" : "-100",
                    }}
                    onClick={() => setNavBarOpen(false)}
                ></Box>
                <Container
                    id={"Exam_Container"}
                    sx={{
                        width: "80vw",
                        maxWidth: "1600px !important",
                        height: "100vh",
                        padding: "15px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        marginLeft: 12,
                        transitionDuration: "0.5s",
                        opacity: NavBarOpen ? "0.3" : "1",
                    }}
                >
                    <Intro NavBarOpen={NavBarOpen} />
                </Container>
            </Container>
        </Fade>
    );
};

export default Exam;

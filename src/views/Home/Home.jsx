import { useState, useEffect } from "react";

import { Fade, Box, Container } from "@mui/material";

import AlertLog from "../Compnents/Alert/AlertLog";
import Loading from "../Compnents/Loading/Loading";

import { Nav, NavList } from "../Compnents/Nav/Nav";
import CenterBtn from "./Compnents/CenterBtn";

const Home = ({ UserName }) => {
    const [NavBarOpen, setNavBarOpen] = useState(false);
    const [ContainerFade, setContainerFade] = useState(true);

    //AlertLog
    const [AlertOpen, setAlertLog] = useState(false);
    const [AlertTitle, setAlertTitle] = useState("");
    const [AlertMsg, setAlertMsg] = useState("");
    const handleAlertLogClose = () => {
        setAlertLog(false);
        setTimeout(() => {
            setAlertTitle("");
            setAlertMsg("");
        }, 500);
    };
    //Loading
    const [LoadingOpen, setLoading] = useState(false);

    useEffect(() => {
        setAlertLog(true);
        setAlertTitle("歡迎使用");
        setAlertMsg("歡迎使用本系統!目前僅開放測驗系統!");
    }, []);

    return (
        <>
            <Loading Loading={LoadingOpen} />
            <AlertLog
                AlertLog={AlertOpen}
                setAlertLog={() => handleAlertLogClose()}
                AlertTitle={AlertTitle}
                AlertMsg={AlertMsg}
            />
            <Fade in={ContainerFade} timeout={1200}>
                <Container
                    id={"Home_Container"}
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
                        setContainerFade={setContainerFade}
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
                    <CenterBtn
                        NavBarOpen={NavBarOpen}
                        NavList={NavList}
                        setContainerFade={setContainerFade}
                    />
                </Container>
            </Fade>
        </>
    );
};

export default Home;

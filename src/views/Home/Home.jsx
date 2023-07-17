import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Fade, Box, Container } from "@mui/material";
import { Main_Container } from "../../common/MainStyle";

import AlertLog from "../Components/AlertLog/AlertLog";
import Loading from "../Components/Loading/Loading";

import { Nav, NavList } from "../Components/Nav/Nav";
import CenterBtn from "./Components/CenterBtn";

const Home = ({ UserName, Teacher }) => {
    const [NavBarOpen, setNavBarOpen] = useState(false);
    const [ContainerFade, setContainerFade] = useState(true);
    const navExamming = useNavigate();

    //AlertLog & Loading Setting------------------------------
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
    const handelAlertLogSetting = (Title, Msg) => {
        setAlertLog(true);
        setAlertTitle(Title);
        setAlertMsg(Msg);
    };
    //Loading
    const [LoadingOpen, setLoading] = useState(false);
    //---------------------------------------------------------

    // 若還在考程中，則回到考試
    useEffect(() => {
        if (localStorage.getItem("Testing")) return navExamming("/exam");
        handelAlertLogSetting("歡迎使用", "歡迎使用本系統!目前僅開放測驗系統!");
    }, []);

    return (
        <>
            <Loading Loading={LoadingOpen} />
            <AlertLog
                AlertLog={AlertOpen}
                setAlertLog={handleAlertLogClose}
                AlertTitle={AlertTitle}
                AlertMsg={AlertMsg}
            />
            <Fade in={ContainerFade} timeout={1200}>
                <Container
                    id={"Home_Container"}
                    sx={Main_Container.Main_Container()}
                >
                    <Nav
                        NavBarOpen={NavBarOpen}
                        setNavBarOpen={setNavBarOpen}
                        UserName={UserName}
                        setContainerFade={setContainerFade}
                        Teacher={Teacher}
                    />
                    {/* Block區塊 */}
                    <Box
                        sx={Main_Container.Nav_Box(NavBarOpen)}
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

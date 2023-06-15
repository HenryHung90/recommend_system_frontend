import { useState } from "react";

import { Fade, Container, Box } from "@mui/material";

import { Main_Container } from "../../common/MainStyle";

import { Nav } from "../Components/Nav/Nav";
import Loading from "../Components/Loading/Loading";
import AlertLog from "../Components/AlertLog/AlertLog";

const Statistics = ({ UserName }) => {
    const [NavBarOpen, setNavBarOpen] = useState(false);
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
    return (
        <>
            <Loading Loading={LoadingOpen} />
            <AlertLog
                AlertLog={AlertOpen}
                setAlertLog={handleAlertLogClose}
                AlertTitle={AlertTitle}
                AlertMsg={AlertMsg}
            />
            <Fade in={true} timeout={1200}>
                <Container
                    id={"Statistics_Container"}
                    sx={Main_Container.Main_Container()}
                >
                    <Nav
                        NavBarOpen={NavBarOpen}
                        setNavBarOpen={setNavBarOpen}
                        UserName={UserName}
                    />
                    {/* Block區塊 */}
                    <Box
                        sx={Main_Container.Nav_Box(NavBarOpen)}
                        onClick={() => setNavBarOpen(false)}
                    ></Box>
                </Container>
            </Fade>
        </>
    );
};

export default Statistics;

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Fade, Container, Box } from "@mui/material";

import { Main_Container } from "../../common/MainStyle";

import { Nav } from "../Components/Nav/Nav";
import Loading from "../Components/Loading/Loading";
import AlertLog from "../Components/AlertLog/AlertLog";

import HistoryList from "./Components/HistoryList";
import HistoryPaper from "./Components/HistoryPaper";
import HistoryRetest from "./Components/HistoryRetest";

const History = ({ UserName }) => {
    const [NavBarOpen, setNavBarOpen] = useState(false);

    // List => 歷史紀錄清單 // Paper => 觀看考試狀況 // Retest => 重複考試
    const [HistoryPage, setHistoryPage] = useState("List");
    // 設定使用哪一張 paper (uuid)
    const [HistoryPaperUUID, setHistoryPaperUUID] = useState("");
    const [getParam, setParam] = useSearchParams();

    useEffect(() => {
        const Page = getParam.get("page");
        const PaperId = getParam.get("uuid");

        if (Page === "Paper" || Page === "Retest") {
            setHistoryPage(Page);
        }
        if (PaperId) {
            setHistoryPaperUUID(PaperId);
        }
    }, []);
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
                    id={"History_Container"}
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
                    <Container
                        sx={{
                            width: "100%",
                            maxWidth: "1500px !important",
                            height: "100%",
                        }}
                    >
                        {HistoryPage === "List" && (
                            <HistoryList
                                AlertLog={handelAlertLogSetting}
                                setHistoryPage={setHistoryPage}
                                setHistoryPaperUUID={setHistoryPaperUUID}
                            />
                        )}
                        {HistoryPage === "Paper" && (
                            <HistoryPaper
                                setLoading={setLoading}
                                setHistoryPage={setHistoryPage}
                                HistoryPaperUUID={HistoryPaperUUID}
                                setHistoryPaperUUID={setHistoryPaperUUID}
                                getParam={getParam}
                                setParam={setParam}
                            />
                        )}
                        {HistoryPage === "Retest" && (
                            <HistoryRetest
                                setLoading={setLoading}
                                setHistoryPage={setHistoryPage}
                                HistoryPaperUUID={HistoryPaperUUID}
                                setHistoryPaperUUID={setHistoryPaperUUID}
                                getParam={getParam}
                                setParam={setParam}
                            />
                        )}
                    </Container>
                </Container>
            </Fade>
        </>
    );
};

export default History;

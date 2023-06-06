import { useState } from "react";

import { Fade, Box, Container, Paper, Grid } from "@mui/material";

import NavBtn from "./Compnents/NavBtn";

const Home = ({ UserName }) => {
    //Nav Bar 功能列表--------------------------------------------------
    //Type 表是哪一個功能 : SideContent 功能內容 : Status 是否啟用
    const NavList = [
        { Type: "Avatar", SideContent: UserName, Status: true },
        { Type: "Start", SideContent: "開始練習", Status: true },
        { Type: "Statistics", SideContent: "統計資料", Status: false },
        { Type: "History", SideContent: "作答紀錄", Status: false },
        { Type: "Bookmarks", SideContent: "收藏區", Status: false },
        { Type: "Interactive", SideContent: "互動", Status: false },
    ];
    const [NavBarOpen, setNavBarOpen] = useState(false);
    const handleNavBarOpen = () => {
        setNavBarOpen(open => !open);
    };
    //----------------------------------------------------------------
    return (
        <Fade in={true} timeout={1200}>
            <Container
                sx={{
                    width: "100vw",
                    maxWidth: "none !important",
                    display: "flex",
                    height: "100vh",
                    overflow: "hidden",
                    margin: "0 !important",
                    padding: "0  !important",
                }}
            >
                <Box
                    id="Home_NavBar"
                    sx={{
                        position: "sticky",
                        height: "100%",
                        transitionDuration: "0.5s",
                        width: NavBarOpen ? "15vw" : "2.5vw",
                        maxWidth: "300px",
                        backgroundColor: "rgb(64,54,47)",
                        zIndex: "1000",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "left",
                        padding: "30px",
                        boxShadow: "3px 0 5px 2px rgb(0,0,0)",
                    }}
                    onClick={handleNavBarOpen}
                >
                    {NavList.map((value, index) => {
                        return (
                            <NavBtn
                                key={index}
                                NavBarOpen={NavBarOpen}
                                Type={value.Type}
                                SideContent={value.SideContent}
                                Status={value.Status}
                            />
                        );
                    })}
                </Box>
                <Container
                    sx={{
                        width: "80vw",
                        height: "80vh",
                        marginLeft: 0,
                        marginTop: 5,
                    }}
                >
                    <Paper elevation={3}>
                        <Grid container spacing={0}>
                            <Grid xs={3}>123</Grid>
                            <Grid xs={9}>5445</Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={3}>
                        <Grid container spacing={0}>
                            <Grid xs={3}>123</Grid>
                            <Grid xs={9}>5445</Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Container>
        </Fade>
    );
};

export default Home;

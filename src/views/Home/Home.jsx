import { useState } from "react";

import { Fade, Box, Container, Paper, Grid } from "@mui/material";

import { Nav, NavList } from '../Compnents/Nav/Nav'
import CenterBtn from "./Compnents/CenterBtn";

const Home = ({ UserName }) => {
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
                <Nav NavBarOpen={NavBarOpen} setNavBarOpen={setNavBarOpen} UserName={UserName} />
                <Container
                    sx={{
                        width: "90vw",
                        maxWidth: "1400px !important",
                        height: "100vh",
                        padding: "15px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        marginLeft: 12,
                        transitionDuration: "0.5s",
                        opacity: NavBarOpen ? "0.3" : "1",
                    }}
                >
                    {NavList.map((value, index) => {
                        if (index !== 0) {
                            return (
                                <CenterBtn
                                    key={index}
                                    SideContent={value.SideContent}
                                    SideDetail={value.SideDetail}
                                    SideImg={value.SideImg}
                                    Status={value.Status}
                                />
                            )
                        }
                    })}
                </Container>
            </Container>
        </Fade>
    );
};

export default Home;

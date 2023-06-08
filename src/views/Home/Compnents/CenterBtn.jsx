import { useNavigate } from "react-router-dom";

import { Container, Box, Grid } from "@mui/material";

import {
    handleCenterBtnClick,
    handleCenterBtnHover,
    handleCenterBtnLeave,
} from "../../../common/navBtnClick";

const CenterBtn = ({ NavList, NavBarOpen }) => {
    const NavLocation = useNavigate();
    return (
        <Container
            id={"Home_Container"}
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
            {NavList.map((value, index) => {
                if (!value.NavOnly) {
                    return (
                        <Grid
                            id={`Home_CenterBtn_${value.Type}`}
                            onClick={e =>
                                handleCenterBtnClick(e, NavBarOpen, NavLocation)
                            }
                            onMouseEnter={e => {
                                handleCenterBtnHover(e, value.Status);
                            }}
                            onMouseLeave={e => {
                                handleCenterBtnLeave(e, value.Status);
                            }}
                            container
                            spacing={0}
                            sx={{
                                width: "90%",
                                marginTop: 2,
                                opacity: value.Status ? 1 : 0.5,
                                transitionDuration: "0.5s",
                                backgroundImage:
                                    "linear-gradient(to right, rgb(214,164,135),rgb(255,255,255))",
                                backgroundPositionX: "-600px",
                                backgroundRepeat: "no-repeat",
                                boxShadow: "0px 0px 10px rgba(0,0,0,0.4)",
                                "&:hover": {
                                    transform: value.Status
                                        ? "scale(1.02)"
                                        : "none",
                                    marginLeft: value.Status ? 2 : 0,
                                },
                            }}
                        >
                            <Grid
                                xs={3}
                                sx={{
                                    backgroundImage: value.SideImg,
                                    backgroundSize: "cover",
                                    height: 150,
                                }}
                            ></Grid>
                            <Grid
                                xs={9}
                                sx={{
                                    padding: "34px 30px",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                    userSelect: "none",
                                }}
                            >
                                <Box
                                    sx={{
                                        fontSize: 38,
                                        letterSpacing: 5,
                                        fontWeight: 600,
                                    }}
                                >
                                    {value.SideContent}
                                </Box>
                                <Box
                                    sx={{
                                        fontSize: 16,
                                        marginTop: 0.15,
                                        marginLeft: 0.2,
                                    }}
                                >
                                    {value.SideDetail}
                                </Box>
                            </Grid>
                        </Grid>
                    );
                }
            })}
        </Container>
    );
};

export default CenterBtn;

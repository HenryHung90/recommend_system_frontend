import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import {
    Fade,
    Container,
    Box,
    Grid,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    Input,
    InputAdornment,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import AlertLog from "../Components/AlertLog/AlertLog";
import Loading from "../Components/Loading/Loading";

import { Connection } from "../../common/axiosConnect";

const Login = ({ setUserName, setAuth }) => {
    useEffect(() => {
        $("#acc").on("keydown", e => {
            if (e.keyCode === 13) login();
        });
        $("#psw").on("keydown", e => {
            if (e.keyCode === 13) login();
        });
    });
    //帳號密碼
    const [acc, setAcc] = useState("");
    const [psw, setPsw] = useState("");
    //設定顯示或隱藏psw
    const [showPassword, setShowPassword] = useState(false);

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

    const NavLocation = useNavigate();
    //Login Function
    const login = () => {
        if ($("#acc").val() === "" || $("#psw").val() === "") {
            setAlertLog(true);
            setAlertTitle("錯誤");
            setAlertMsg("帳號或密碼不得為空");
        }

        setLoading(true);

        Connection.login(acc, psw).then(res => {
            if (res.data.state) {
                const tokenDetail = Connection.decode(res.data.result.token);

                localStorage.setItem("token", res.data.result.token);
                localStorage.setItem(
                    "refresh_token",
                    tokenDetail.refresh_token
                );

                setUserName(tokenDetail.name);
                setAuth(true);
                NavLocation("/home");
            } else {
                handelAlertLogSetting("通知", res.data.msg);
                setLoading(false);
            }
        });
    };

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
                <Grid
                    container
                    spacing={0}
                    sx={{
                        margin: 0,
                        padding: 0,
                        width: "100vw",
                        height: "100vh",
                        overflow: "hidden",
                    }}
                >
                    <Grid
                        xs={4}
                        sx={{
                            backgroundImage: "url(../media/login.jpg)",
                            backgroundSize: "cover",
                            backgroundPositionX: -340,
                        }}
                    ></Grid>
                    <Grid xs={8}>
                        <Container
                            sx={{
                                margin: 0,
                                padding: 0,
                                backgroundColor: "rgb(183,74,95)",
                                maxWidth: "100% !important",
                                height: "100%",
                                display: "inline-flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "90%",
                                    margin: "50px 0",
                                    textAlign: "center",
                                    fontSize: 100,
                                    fontFamily: "Roboto Condensed",
                                    userSelect: "none",
                                }}
                            >
                                YZU Examming Lab
                            </Box>
                            <Box
                                sx={{
                                    width: "70%",
                                    margin: "0 auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    padding: "30px 20px",
                                    border: "2.5px solid rgba(0,0,0,0.5)",
                                    borderRadius: "10px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FormControl
                                        sx={{ m: 2, width: "30ch" }}
                                        variant="standard"
                                    >
                                        <InputLabel htmlFor="standard-adornment-account">
                                            帳號
                                        </InputLabel>
                                        <Input
                                            id="acc"
                                            type="text"
                                            label="帳號"
                                            value={acc}
                                            onChange={e => {
                                                setAcc(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{ m: 2, width: "30ch" }}
                                        variant="standard"
                                    >
                                        <InputLabel htmlFor="standard-adornment-password">
                                            密碼
                                        </InputLabel>
                                        <Input
                                            id="psw"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={psw}
                                            onChange={e => {
                                                setPsw(e.target.value);
                                            }}
                                            // 結尾要放甚麼Icon
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                show => !show
                                                            )
                                                        }
                                                        onMouseDown={e =>
                                                            e.preventDefault()
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="帳號"
                                        />
                                    </FormControl>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "50px",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{
                                            width: "40%",
                                            backgroundColor: "rgb(239,230,230)",
                                            color: "black",
                                            "&:hover": {
                                                backgroundColor:
                                                    "rgb(240,150,150)",
                                            },
                                        }}
                                        onClick={login}
                                    >
                                        登入
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </Grid>
                </Grid>
            </Fade>
        </>
    );
};

export default Login;

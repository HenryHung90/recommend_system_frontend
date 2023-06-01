import { useState } from "react";
import {
    Container,
    Box,
    Grid,
    Fade,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    Input,
    InputAdornment,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Connection } from "../../common/axiosConnect";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(show => !show);
    const handleMouseDownPassword = e => {
        e.preventDefault();
    };

    return (
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
                                    <Input id="acc" type="text" label="帳號" />
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
                                            showPassword ? "text" : "password"
                                        }
                                        // 結尾要放甚麼Icon
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
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
                                            backgroundColor: "rgb(240,150,150)",
                                        },
                                    }}
                                >
                                    登入
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Grid>
            </Grid>
        </Fade>
    );
};

export default Login;

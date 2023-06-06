import { Box, Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import CreateIcon from "@mui/icons-material/Create";
import {
    BarChart,
    YoutubeSearchedFor,
    Bookmarks,
    Group,
} from "@mui/icons-material";

const NavBtn = ({ NavBarOpen, Type, SideContent, Status }) => {
    const NavIconBoxStyle = {
        width: 58,
        height: 58,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 16,
    };
    const NavIconStyle = {
        width: 58,
        height: 30,
    };

    const SideIcon = handleIcon(Type);
    function handleIcon(Type) {
        switch (Type) {
            case "Avatar":
                return (
                    <Avatar
                        sx={{
                            bgcolor: deepPurple[500],
                            width: 58,
                            height: 58,
                        }}
                    >
                        {SideContent[0]}
                    </Avatar>
                );
            case "Start":
                return (
                    <Box sx={NavIconBoxStyle}>
                        <CreateIcon sx={NavIconStyle}></CreateIcon>
                    </Box>
                );
            case "Statistics":
                return (
                    <Box sx={NavIconBoxStyle}>
                        <BarChart sx={NavIconStyle}></BarChart>
                    </Box>
                );
            case "History":
                return (
                    <Box sx={NavIconBoxStyle}>
                        <YoutubeSearchedFor
                            sx={NavIconStyle}
                        ></YoutubeSearchedFor>
                    </Box>
                );
            case "Bookmarks":
                return (
                    <Box sx={NavIconBoxStyle}>
                        <Bookmarks sx={NavIconStyle}></Bookmarks>
                    </Box>
                );
            case "Interactive":
                return (
                    <Box sx={NavIconBoxStyle}>
                        <Group sx={NavIconStyle}></Group>
                    </Box>
                );
            default:
                break
        }
    }

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                transitionDuration: "0.3s",
                padding: "10px 10px",
                paddingLeft: NavBarOpen ? "20px" : 0,
                borderRadius: "10px",
                "&:hover": {
                    backgroundColor:
                        NavBarOpen && Status && Type !== "Avatar"
                            ? "rgba(255, 255, 255, 0.4)"
                            : "",
                },
                opacity: Status ? "1" : "0.5",
            }}
        >
            {SideIcon}
            <Box
                sx={{
                    transitionDuration: "0.3s",
                    color: "white",
                    marginLeft: NavBarOpen ? "20px" : "0",
                    fontSize: Type === "Avatar" ? 60 : 24,
                    fontWeight: "bolder",
                    opacity: NavBarOpen ? "1" : "0",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    fontFamily: "Roboto Condensed",
                }}
            >
                {SideContent}
            </Box>
        </Box>
    );
};

export default NavBtn;

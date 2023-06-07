import { Box, Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import CreateIcon from "@mui/icons-material/Create";
import {
    BarChart,
    YoutubeSearchedFor,
    Bookmarks,
    Group,
} from "@mui/icons-material";

//Nav Bar 功能列表
//Type 表是哪一個功能 : SideContent 功能內容 : Status 是否啟用
const NavList = [
    { Type: "Avatar", SideContent: "", Status: true },
    { Type: "Start", SideContent: "開始練習", Status: true, SideDetail: "藉由以往的答題經驗給予適合您練習的題目", SideImg: "url(../media/Start.jpg)" },
    { Type: "Statistics", SideContent: "統計資料", Status: false, SideDetail: "觀看您作答時間與作答成績等統計資料", SideImg: "url(../media/Statistics.jpg)" },
    { Type: "History", SideContent: "作答紀錄", Status: false, SideDetail: "觀看您曾經做過的題目並能對其複習、溫故知新", SideImg: "url(../media/History.jpg)" },
    { Type: "Bookmarks", SideContent: "收藏區", Status: false, SideDetail: "能夠找到你精選的題目，並且能製作筆記", SideImg: "url(../media/Bookmarks.jpg)" },
    { Type: "Interactive", SideContent: "互動", Status: false, SideDetail: "看看你的同學們作答的平均以及為其出題", SideImg: "url(../media/Interactive.jpg)" },
];

const Nav = ({ NavBarOpen, setNavBarOpen, UserName }) => {
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

    const handleNavBarOpen = () => {
        setNavBarOpen(open => !open);
    };

    const handleIcon = Type => {
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
                        {UserName[0]}
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
            id="Home_NavBar"
            sx={{
                position: "absolute",
                height: "100vh",
                overflowY: 'hidden',
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
                    <Box
                        key={index}
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
                                    NavBarOpen && value.Status && value.Type !== "Avatar"
                                        ? "rgba(255, 255, 255, 0.4)"
                                        : "",
                            },
                            opacity: value.Status ? "1" : "0.5",
                        }}
                    >
                        {handleIcon(value.Type)}
                        <Box
                            sx={{
                                transitionDuration: "0.3s",
                                color: "white",
                                marginLeft: NavBarOpen ? "20px" : "0",
                                fontSize: value.Type === "Avatar" ? 60 : 24,
                                fontWeight: "bolder",
                                opacity: NavBarOpen ? "1" : "0",
                                userSelect: "none",
                                whiteSpace: "nowrap",
                                fontFamily: "Roboto Condensed",
                            }}
                        >
                            {value.SideContent}
                        </Box>
                    </Box>
                )
            })}
        </Box>
    );
};

export { Nav, NavList };

import { useNavigate } from "react-router-dom";

import { Box, Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import CreateIcon from "@mui/icons-material/Create";
import {
    Home,
    BarChart,
    YoutubeSearchedFor,
    Bookmarks,
    Group,
} from "@mui/icons-material";

import { handleNavBtnClick } from "../../../common/navBtnClick";

//Nav Bar 功能列表
//Type 表是哪一個功能 : SideContent 功能內容 : Status 是否啟用 : SideDetail 簡易描述 : SideImg 圖 : NavOnly 是否只在 Nav 顯示
const NavList = [
    { Type: "Avatar", SideContent: "", Status: true, NavOnly: true },
    { Type: "Home", SideContent: "首頁", Status: true, NavOnly: true },
    {
        Type: "Exam",
        SideContent: "開始練習",
        Status: true,
        SideDetail: "藉由以往的答題經驗給予適合您練習的題目",
        SideImg: "url(../media/Exam.jpg)",
        NavOnly: false,
    },
    {
        Type: "Statistics",
        SideContent: "統計資料",
        Status: false,
        SideDetail: "觀看您作答時間與作答成績等統計資料",
        SideImg: "url(../media/Statistics.jpg)",
        NavOnly: false,
    },
    {
        Type: "History",
        SideContent: "歷史紀錄",
        Status: true,
        SideDetail: "觀看您曾經做過的題目並能對其複習、溫故知新",
        SideImg: "url(../media/History.jpg)",
        NavOnly: false,
    },
    {
        Type: "Bookmarks",
        SideContent: "收藏區",
        Status: false,
        SideDetail: "能夠找到你精選的題目，並且能製作筆記",
        SideImg: "url(../media/Bookmarks.jpg)",
        NavOnly: false,
    },
    // {
    //     Type: "Interactive",
    //     SideContent: "互動",
    //     Status: false,
    //     SideDetail: "看看你的同學們作答的平均以及為其出題",
    //     SideImg: "url(../media/Interactive.jpg)",
    //     NavOnly: false,
    // },
];

const Nav = ({ NavBarOpen, setNavBarOpen, UserName }) => {
    const NavLocation = useNavigate();

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

    //處理NavBar的開關
    const handleNavBarOpen = () => {
        setNavBarOpen(open => !open);
    };

    //是否正在該頁面上
    const isOnThisPage = Type => {
        return window.location.pathname.split("/")[1] == Type.toLowerCase();
    };

    // 決定是哪一種Icon給予Icon樣式
    const handleIcon = Type => {
        switch (Type) {
            case "Avatar":
                NavList[0].SideContent = UserName;
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
            case "Home":
                return (
                    <Box sx={NavIconBoxStyle}>
                        <Home sx={NavIconStyle}></Home>
                    </Box>
                );
            case "Exam":
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
                break;
        }
    };

    return (
        <Box
            id="NavBar"
            sx={{
                position: "absolute",
                height: "100% - 30px",
                transitionDuration: "0.5s",
                width: NavBarOpen ? "300px" : "50px",
                backgroundColor: "rgb(64,54,47)",
                opacity: NavBarOpen ? "1" : "0.7",
                "&:hover": {
                    opacity: "1",
                },
                zIndex: "1000",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "left",
                padding: "30px",
                boxShadow: "3px 0 5px 2px rgb(0,0,0)",
                borderRadius: "0 0 20px 0",
                zIndex: "1000",
            }}
            onClick={handleNavBarOpen}
        >
            {NavList.map((value, index) => {
                return (
                    <Box
                        id={`Home_NavBtn_${value.Type}`}
                        onClick={e =>
                            value.Status
                                ? handleNavBtnClick(e, NavBarOpen, NavLocation)
                                : null
                        }
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
                                    NavBarOpen &&
                                    value.Status &&
                                    value.Type !== "Avatar"
                                        ? "rgba(255, 255, 255, 0.4)"
                                        : "",
                            },
                            backgroundColor: isOnThisPage(value.Type)
                                ? "rgb(183,74,95)"
                                : "none",
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
                );
            })}
        </Box>
    );
};

export { Nav, NavList };

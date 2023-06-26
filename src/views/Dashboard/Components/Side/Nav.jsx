import {
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Divider,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import QuizIcon from "@mui/icons-material/Quiz";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import GroupIcon from "@mui/icons-material/Group";
// 側邊導覽列生成
const NavList = ({ setPage }) => {
    const handleClick = (e, Type) => {
        setPage(Type);
    };

    const ListDetail = [
        {
            Title: "主畫面",
            Icon: <HomeIcon />,
            Page: "Home",
        },
        {
            Title: "題庫總覽",
            Icon: <QuizIcon />,
            Page: "Quizzes",
        },
        {
            Title: "卷次查詢",
            Icon: <FindInPageIcon />,
            Page: "Papers",
        },
        {
            Title: "學生管理",
            Icon: <GroupIcon />,
            Page: "Students",
        },
    ];

    return (
        <Box sx={{ width: 250, paddingTop: 5 }} role="presentation">
            <List>
                {ListDetail.map((value, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            onClick={e => handleClick(e, value.Page)}
                        >
                            <ListItemIcon>{value.Icon}</ListItemIcon>
                            <ListItemText primary={value.Title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );
};

const Nav = ({ NavBar, setNavBarOpen, setPage }) => {
    const handleOpenNavBar = () => {
        setNavBarOpen(open => !open);
    };

    return (
        <Box
            sx={{
                width: "100vw",
                height: 80,
                backgroundColor: "rgb(64,54,47)",
                padding: "0 40px",
                display: "flex",
                alignItems: "center",
            }}
        >
            {/* 側邊欄按鈕 */}
            <IconButton aria-label="MenuIcon" onClick={handleOpenNavBar}>
                <MenuIcon sx={{ color: "white" }} fontSize="large" />
            </IconButton>
            {/* 側邊攔 */}
            <Drawer
                anchor="left"
                open={NavBar}
                onClick={() => setNavBarOpen(false)}
            >
                <NavList
                    setNavBarOpen={() => setNavBarOpen(false)}
                    setPage={setPage}
                />
            </Drawer>
            <Box
                sx={{
                    color: "white",
                    fontFamily: "Roboto Condensed",
                    fontSize: 30,
                    width: "80%",
                    textAlign: "center",
                }}
            >
                Teacher Center
            </Box>
        </Box>
    );
};

export default Nav;

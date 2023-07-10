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

import MenuIcon from "@mui/icons-material/Menu";
// 側邊導覽列生成
const NavList = ({ setPage, ListDetail, setParam }) => {
    const handleClick = (e, Type) => {
        setPage(Type);
        setParam({ page: Type });
    };

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

const Nav = ({ NavBar, setNavBarOpen, setPage, setParam, ListDetail }) => {
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
                    setPage={setPage}
                    ListDetail={ListDetail}
                    setParam={setParam}
                />
            </Drawer>
        </Box>
    );
};

export default Nav;

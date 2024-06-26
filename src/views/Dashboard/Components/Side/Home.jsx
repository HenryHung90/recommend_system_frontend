import { Container, Box, Button } from "@mui/material";

const Home = ({ UserName, setPage, setParam, setLoading, ListDetail }) => {
    const handleHomeNavListButtonClick = (e, page) => {
        setPage(page);
        setParam({ page: page });
    };

    return (
        <Container>
            <Box
                sx={{
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "bolder",
                }}
            >
                {UserName || "Unknown User"}，您好！
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: 5,
                }}
            >
                {ListDetail.map((list, index) => {
                    if (list.Page !== "Home") {
                        return (
                            <Button
                                key={index}
                                variant="contained"
                                size="large"
                                sx={{ width: "10vw", minWidth: 150 }}
                                startIcon={list.Icon}
                                onClick={e =>
                                    handleHomeNavListButtonClick(e, list.Page)
                                }
                            >
                                {list.Title}
                            </Button>
                        );
                    }
                })}
            </Box>
        </Container>
    );
};

export default Home;

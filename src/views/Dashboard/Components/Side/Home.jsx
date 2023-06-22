import { Container, Box } from "@mui/material";

const Home = ({ UserName }) => {
    return (
        <Container>
            <Box
                sx={{
                    fontSize: 20,
                    fontWeight: "bolder",
                }}
            >
                {UserName || "Unknown User"}，您好！
            </Box>
            
        </Container>
    );
};

export default Home;

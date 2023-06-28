import { Backdrop, CircularProgress } from "@mui/material";

const Loading = ({ Loading }) => {
    return (
        <Backdrop sx={{ color: "#fff", zIndex: "10000" }} open={Loading}>
            <CircularProgress color="inherit" size={100} />
        </Backdrop>
    );
};

export default Loading;

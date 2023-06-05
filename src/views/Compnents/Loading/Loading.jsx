import {
    Backdrop,
    CircularProgress
} from "@mui/material"

const Loading = ({ Loading }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={Loading}
        >
            <CircularProgress color="inherit" size={100} />
        </Backdrop>
    )
}

export default Loading
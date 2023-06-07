import { Box, Paper, Grid } from "@mui/material";

const CenterBtn = ({ SideContent, SideDetail, SideImg, Status }) => {
    return (
        <Grid container spacing={0}
            sx={{
                width: '90%',
                marginTop: 2,
                opacity: Status ? 1 : 0.5,
                transitionDuration: '0.5s',
                backgroundImage: "linear-gradient(90deg, rgb(214,164,135),rgb(255,255,255))",
                backgroundPositionX: "-600px",
                backgroundRepeat: "no-repeat",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.4)",
                '&:hover': {
                    backgroundPositionX: Status ? 0 : "-600px",
                    transform: Status ? "scale(1.05)" : 'none',
                    marginLeft: Status ? 2 : 0,
                }
            }}>
            <Grid xs={3} sx={{
                backgroundImage: SideImg,
                backgroundSize: "cover",
                height: 150,
            }}></Grid>
            <Grid xs={9} sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                userSelect: "none",
            }}>
                <Box sx={{
                    fontSize: 32,
                    fontWeight: 600
                }}>{SideContent}</Box>
                <Box sx={{
                    fontSize: 12,
                    marginTop: 2,
                    marginLeft: 2,
                }}>{SideDetail}</Box>
            </Grid>
        </Grid>
    )
}

export default CenterBtn
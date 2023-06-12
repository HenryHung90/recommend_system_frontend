import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material'

const AlertLog = ({ AlertLog, AlertTitle, AlertMsg, setAlertLog }) => {
    return (
        <Dialog
            open={AlertLog}
            onClose={setAlertLog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {AlertTitle || "通知"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {AlertMsg || "無訊息"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={setAlertLog}>好</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertLog

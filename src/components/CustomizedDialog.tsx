import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type DialogProps = {
    title: string;
    content: string;
    buttonLabel: string;
    onClose: (open: boolean) => void;
}

const CustomizedDialog: React.FC<DialogProps> = ({title, content, buttonLabel, onClose}) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        onClose(false);
    };

    return (
        <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    {content}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    {buttonLabel}
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}

export default CustomizedDialog;

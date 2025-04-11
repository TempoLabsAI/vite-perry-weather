import { ComponentProps, memo } from 'react';
import { Snackbar, SnackbarCloseReason, SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Bread, BreadVariant } from './Bread';
import { Check, ErrorOutline, InfoOutlined, WarningAmber } from '@mui/icons-material';
import { SxStyleGenerator } from '@/perry-weather/types/mui';
import merge from 'lodash.merge';

export interface ToastProps {
    variant: BreadVariant;
    header: string;
    message?: string;
    show: boolean;
    autoHideDuration?: number;
    disableAutoHide?: boolean;
    onToastClose?: (event: Event | React.SyntheticEvent<unknown, Event>, reason: SnackbarCloseReason) => void;
    onClose?: () => void;
    sx?: {
        snackbar?: SxProps<Theme>;
        bread?: ComponentProps<typeof Bread>['sx'];
    };
}

const useStyles: SxStyleGenerator = theme => ({
    snackbar: {
        '&.MuiSnackbar-root': {
            position: 'fixed',
            top: '80px',
            right: '2%',
            bottom: 'auto',
            left: 'auto',
            minWidth: '10%',
            [theme.breakpoints.up('sm')]: {
                maxWidth: '500px'
            }
        }
    },
    bread: {}
});

export const Toast = memo(function Snack(props: ToastProps) {
    const { variant, header, message, show, onToastClose, onClose, sx, disableAutoHide = false, autoHideDuration = 3000 } = props;

    const theme = useTheme();
    const styles = useStyles(theme);
    const snackbarStyles = merge(styles.snackbar, sx?.snackbar);
    const breadStyles = merge(styles.bread, sx?.bread);

    const iconElem = () => {
        switch (variant) {
            case 'success':
                return <Check />;
            case 'error':
                return <ErrorOutline />;
            case 'warn':
                return <WarningAmber />;
            case 'info':
                return <InfoOutlined />;
            default:
                return undefined;
        }
    };

    return (
        <Snackbar
            autoHideDuration={disableAutoHide ? null : autoHideDuration}
            transitionDuration={500}
            onClose={onToastClose}
            open={show}
            sx={snackbarStyles}>
            <div>
                <Bread variant={variant} header={header} icon={iconElem()} message={message} closeable onClose={onClose} sx={breadStyles} />
            </div>
        </Snackbar>
    );
});

import { Close } from '@mui/icons-material';
import { Grid, Typography, Paper, PaperProps, Button, styled, SxProps } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { memo } from 'react';

export type BreadVariant = 'error' | 'warn' | 'info' | 'success';

interface StyledPaperProps extends PaperProps {
    breadvariant: BreadVariant;
    theme: Theme;
}

interface BreadProps {
    variant: BreadVariant;
    header?: string;
    icon?: JSX.Element;
    message?: string;
    closeable?: boolean;
    onClose?: () => void;
    sx?: {
        paper?: SxProps<Theme>;
    };
}

const StyledPaper = styled(Paper, {
    shouldForwardProp: prop => prop !== 'breadvariant'
})<StyledPaperProps>(({ breadvariant, theme }) => ({
    padding: '8px 16px 8px 16px',
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    display: 'flex',
    alignItems: 'start',
    ...(breadvariant === 'error' && {
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
        backgroundColor: theme.palette.background.error
    }),
    ...(breadvariant === 'warn' && {
        color: theme.palette.warning.main,
        borderColor: theme.palette.warning.main,
        backgroundColor: theme.palette.background.warning
    }),
    ...(breadvariant === 'info' && {
        color: theme.palette.info.light,
        borderColor: theme.palette.info.light,
        backgroundColor: theme.palette.info.dark
    }),
    ...(breadvariant === 'success' && {
        color: theme.palette.success.main,
        borderColor: theme.palette.success.main,
        backgroundColor: theme.palette.background.success
    })
}));

export const Bread = memo(function Bread(props: BreadProps) {
    const { variant, header, message, icon, closeable, sx = {} } = props;
    const theme = useTheme();

    const onClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    return (
        <StyledPaper breadvariant={variant} theme={theme} sx={sx.paper}>
            <Grid container direction="row" alignItems="center">
                {icon && (
                    <Grid item display="flex" marginRight={2}>
                        {icon}
                    </Grid>
                )}
                <Grid container flex={1} item flexDirection="column" alignItems="start">
                    {header && <Typography variant="subtitle1">{header}</Typography>}
                    {message && (
                        <Typography variant="body2" maxWidth="240px">
                            {message}
                        </Typography>
                    )}
                </Grid>
                {closeable && (
                    <Grid item>
                        <Button color="inherit" onClick={onClose}>
                            <Close />
                        </Button>
                    </Grid>
                )}
            </Grid>
        </StyledPaper>
    );
});

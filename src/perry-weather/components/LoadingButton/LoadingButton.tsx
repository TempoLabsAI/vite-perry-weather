import { Button as MUIButton, Typography, useTheme, Theme, SxProps, Box } from '@mui/material';
import merge from 'lodash.merge';
import { useEffect } from 'react';

interface ButtonProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    duration?: number; // in seconds
    loop?: boolean;
    finishedLoading?: () => void;
    sx?: {
        button?: SxProps<Theme>;
        loadingAnimation?: SxProps<Theme>;
    };
}

const useStyles = (theme: Theme, duration?: number, loop?: boolean, isLoading?: boolean): { [key: string]: SxProps } => ({
    button: {
        height: 48,
        width: '100%',
        borderRadius: 100,
        border: '1px solid',
        borderColor: theme.palette.border.input,
        padding: '0 24px',
        background: theme.palette.mode === 'dark' ? '#1E3341' : '#fff',
        textTransform: 'none',
        textAlign: 'center',
        overflow: 'hidden',
        '&:focus': {
            boxShadow: '0px 0px 0px 2px #0F151E, 0px 0px 0px 4px rgba(96, 177, 215, 0.5)'
        },
        '&:focus-visible': {
            boxShadow: '0px 0px 0px 2px #0F151E, 0px 0px 0px 4px rgba(96, 177, 215, 0.5)'
        },
        '&.Mui-disabled': {
            '& .MuiButton-label': {
                color: theme.palette.text.disabled
            }
        }
    },

    loadingAnimation: {
        '@keyframes load': {
            '0%': {
                transform: 'translateX(-100%)'
            },
            '100%': {
                transform: 'translateX(0%)'
            }
        },
        position: 'absolute',
        background: 'linear-gradient(270deg, #D3DB8F 0%, #49C2C1 90.3%)',
        opacity: 0.2,
        left: 0,
        width: '100%',
        height: '100%',
        transform: 'translateX(-100%)',
        animation: isLoading ? `load ${duration}000ms linear ${loop ? 'infinite' : 1}` : 'none'
    }
});

export function LoadingButton(props: ButtonProps) {
    const {
        children,
        style,
        onClick,
        finishedLoading,
        disabled = false,
        isLoading = false,
        loadingText = '',
        duration = 5,
        loop = false,
        sx
    } = props;
    const theme = useTheme();

    const classes = useStyles(theme, duration, loop, isLoading);
    const buttonStyles = merge(classes.button, sx?.button);
    const loadingAnimationStyles = merge(classes.loadingAnimation, sx?.loadingAnimation);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick && !isLoading) {
            onClick(event);
        }
    };

    useEffect(() => {
        if (isLoading && finishedLoading) {
            setTimeout(() => {
                if (finishedLoading) {
                    finishedLoading();
                }
            }, duration * 1000);
        }
    }, [isLoading, duration]);

    return (
        <MUIButton
            style={{ justifyContent: isLoading ? 'center' : 'space-between', ...style }}
            sx={buttonStyles}
            onClick={handleClick}
            className="loadingButton"
            disabled={disabled}>
            {isLoading && <Typography>{loadingText}</Typography>}
            {!isLoading && children}
            <Box sx={loadingAnimationStyles} />
        </MUIButton>
    );
}

export default LoadingButton;

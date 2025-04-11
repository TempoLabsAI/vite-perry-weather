import { Button as MUIButton } from '@mui/material';
import { useTheme, Theme, SxProps } from '@mui/material/styles';
import merge from 'lodash.merge';

type ButtonTypes = 'primary' | 'clear' | 'clearBlue' | 'delete';
type ButtonStyles = { [key in ButtonTypes | 'base']?: SxProps<Theme> };

interface ButtonProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: ButtonTypes;
    disabled?: boolean;
    sx?: ButtonStyles;
}

const useStyles = (theme: Theme): ButtonStyles => ({
    base: {
        textTransform: 'none',
        height: 48,
        borderRadius: 100,
        padding: '0 24px',
        [theme.breakpoints.down('md')]: {
            padding: '0 18px'
        },
        '&:focus': {
            boxShadow: '0px 0px 0px 2px #0F151E, 0px 0px 0px 4px rgba(96, 177, 215, 0.5)'
        },
        '&:focus-visible': {
            boxShadow: '0px 0px 0px 2px #0F151E, 0px 0px 0px 4px rgba(96, 177, 215, 0.5)'
        },
        '&.Mui-disabled': {
            color: theme.palette.text.disabled
        }
    },
    primary: {
        background: 'linear-gradient(207.43deg, #FFE37E -10.71%, #22BACF 131.76%)',
        border: '0px !important',
        color: theme.palette.text.dark,
        '&:hover': {
            background: 'linear-gradient(196.4deg, #FFE37E -79.78%, #22BACF 134.73%), linear-gradient(207.43deg, #FFE37E -10.71%, #22BACF 131.76%)'
        },
        '&.Mui-disabled': {
            background: theme.palette.background.disabled,
            color: theme.palette.text.disabled
        }
    },
    clear: {
        background: 'transparent',
        border: '1px solid',
        borderColor: theme.palette.action.inactive,
        color: theme.palette.text.primary,
        '&:hover': {
            background: 'transparent',
            border: '1px solid'
        },
        '&.Mui-disabled': {
            background: 'transparent',
            border: '1px solid',
            borderColor: theme.palette.action.disabled
        }
    },
    clearBlue: {
        background: 'transparent',
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&:hover': {
            background: 'transparent',
            color: theme.palette.text.primary,
            border: '1px solid'
        },
        '&.Mui-disabled': {
            background: 'transparent',
            border: '1px solid',
            borderColor: theme.palette.action.disabled
        }
    },
    delete: {
        color: theme.palette.text.primary,
        background: theme.palette.error.main,
        '&:hover': {
            background: theme.palette.error.light
        },
        '&.Mui-disabled': {
            background: theme.palette.background.paper,
            border: '1px solid'
        }
    }
});

export function Button(props: ButtonProps) {
    const { children, style, onClick, type = 'primary', disabled = false, sx } = props;
    const theme = useTheme();

    const classes = useStyles(theme);
    const styles = merge(classes.base, classes[type], sx?.base, sx?.[type]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.focus();
        if (onClick) onClick(event);
    };

    return (
        <MUIButton style={style} onClick={handleClick} color="primary" sx={styles} disabled={disabled}>
            {children}
        </MUIButton>
    );
}

export default Button;

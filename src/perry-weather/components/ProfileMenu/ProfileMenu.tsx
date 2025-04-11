import { Avatar, Divider } from '@mui/material';
import React, { useContext, useRef } from 'react';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';

import { Menu as PWMenu } from '../Menu/Menu';
import { PWMenuItem } from '../Menu/MenuItem';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { PWThemeContext, ThemeType } from '../Theme';

const useStyles = () => ({
    avatar: {
        '@keyframes rainbow': {
            '0%': {
                backgroundPosition: '0% 90%'
            },
            '50%': {
                backgroundPosition: '100% 19%'
            },
            '100%': {
                backgroundPosition: '0% 82%'
            }
        },
        background: 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)',
        backgroundSize: '1800% 1800%',
        animation: `rainbow 18s ease infinite`,
        width: 32,
        height: 32
    }
});

type ProfileMenuProps = {
    children?: (props: { onClose: () => void }) => React.ReactNode;
    name: string;
    initials: string;
    onLogout: () => void;
};

export function ProfileMenu(props: ProfileMenuProps) {
    const { theme: themeType, setTheme } = useContext(PWThemeContext);
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleThemeChange = () => {
        if (themeType === ThemeType.DARK) setTheme(ThemeType.LIGHT);
        else setTheme(ThemeType.DARK);
    };

    const handleNameClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                ref={buttonRef}
                sx={{ textTransform: 'none' }}
                color="inherit"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleNameClick}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Avatar sx={classes.avatar}>{props.initials}</Avatar>
                    <Typography sx={{ marginLeft: '10px' }} variant="subtitle1">
                        {props.name}
                    </Typography>
                </Box>
            </Button>
            <PWMenu anchorEl={buttonRef?.current} open={open} onClose={handleClose}>
                {/* Any children will render prior to the theme switcher and signout button */}
                {props.children?.({ onClose: handleClose })}
                <PWMenuItem onClick={handleThemeChange}>
                    <Box width="100%" display="flex" justifyContent="space-between">
                        <Typography style={{ textDecoration: 'none', color: theme.palette.text.primary }}>Theme:&nbsp;</Typography>
                        <Typography variant="subtitle1">{theme.palette.mode === 'dark' ? 'Dark' : 'Light'}</Typography>
                        {theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                    </Box>
                </PWMenuItem>
                <Divider />
                <PWMenuItem onClick={props.onLogout}>Sign Out</PWMenuItem>
            </PWMenu>
        </>
    );
}

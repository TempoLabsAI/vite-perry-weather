import { MenuItem, MenuItemProps, styled, useTheme } from '@mui/material';

const StyledMenuItem = styled(MenuItem, {
    shouldForwardProp: prop => prop !== 'success'
})<MenuItemProps>(({ theme, disabled }) => ({
    '&:hover': {
        ...(!disabled && {
            backgroundColor: theme.palette.background.focus
        })
    },
    '&.Mui-disabled': {
        ...(disabled && {
            opacity: 1
        })
    }
}));

export function PWMenuItem(props: MenuItemProps) {
    const theme = useTheme();

    return <StyledMenuItem {...props} theme={theme} />;
}

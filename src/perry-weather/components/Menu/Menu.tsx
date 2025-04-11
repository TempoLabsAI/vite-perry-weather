import { MenuProps, Menu as MuiMenu, styled, SxProps } from '@mui/material';

interface PWMenuProps {
    children: React.ReactNode;
    anchorEl?: MenuProps['anchorEl'];
    style?: SxProps;
    open: boolean;
    onClose: React.MouseEventHandler;
}

const CustomMenu = styled(MuiMenu)(({ theme }) => ({
    '& .MuiPaper-root': {
        marginTop: 5,
        borderRadius: 8,
        background: theme.palette.background.default,
        border: '1px solid',
        borderColor: theme.palette.border.main,
        '& .MuiList-root .MuiMenuItem-root:hover': {
            backgroundColor: theme.palette.action.hoverSecondary
        }
    }
}));

export function Menu(props: PWMenuProps) {
    const { children, anchorEl, style, open, onClose } = props;

    return (
        <CustomMenu
            open={open}
            sx={style}
            anchorEl={anchorEl}
            onClose={onClose}
            keepMounted
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}>
            {children}
        </CustomMenu>
    );
}

export default Menu;

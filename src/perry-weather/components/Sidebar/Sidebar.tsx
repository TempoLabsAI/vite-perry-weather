import { Container, Drawer, ListItemButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import Tooltip from '../Tooltip/Tooltip';

const useStyles = (theme: Theme) => ({
    tooltip: {
        tooltip: {
            sx: {
                backgroundColor: theme.palette.background.disabled,
                fontSize: 14
            }
        },
        arrow: {
            sx: {
                color: theme.palette.background.disabled
            }
        }
    },
    drawerPaper: {
        '& .MuiDrawer-paper': {
            width: 54,
            background: theme.palette.background.default,
            borderRight: 'solid 1px',
            borderRightColor: theme.palette.border.sidebar
        }
    },
    mobileDrawerPaper: {
        '& .MuiDrawer-paper': {
            width: 260,
            background: theme.palette.background.default,
            borderRight: 'solid 1px',
            borderRightColor: theme.palette.border.sidebar
        }
    },
    listItem: {
        background: 'transparent',
        '& .MuiListItemIcon-root': {
            minWidth: '100%',
            justifyContent: 'center',
            color: theme.palette.action.inactive,
            alignItems: 'center',
            height: 24,
            '& .svg-container': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: theme.palette.action.inactive,
                position: 'absolute',
                borderRadius: '8px',
                width: 32,
                height: 32
            },
            '&:hover': {
                color: theme.palette.action.hover,
                '& path': {
                    fill: theme.palette.action.hover
                },
                '& .svg-container': {
                    background: theme.palette.action.hoverSecondary
                }
            }
        },
        '&.Mui-selected': {
            backgroundColor: 'transparent',
            '& .MuiListItemIcon-root': {
                color: theme.palette.action.selected,
                borderLeftColor: theme.palette.action.selected,
                borderLeftWidth: 2,
                borderLeftStyle: 'solid',
                '& path': {
                    fill: theme.palette.action.selected
                },
                '&:hover': {
                    color: theme.palette.action.selected,
                    '& path': {
                        fill: theme.palette.action.selected
                    }
                }
            },
            '&:hover': {
                backgroundColor: 'transparent'
            }
        },
        '&:hover': {
            background: 'transparent'
        }
    },
    mobileListItem: {
        background: 'transparent',
        '& .MuiListItemIcon-root': {
            minWidth: '100%',
            justifyContent: 'flex-start',
            color: theme.palette.action.inactive,
            alignItems: 'center',
            width: '100%',
            height: 32,
            '& .svg-container': {
                display: 'flex',
                marginLeft: '8px',
                alignItems: 'center',
                borderRadius: '8px',
                '& .MuiTypography-root': {
                    marginLeft: '4px'
                }
            },
            '&:hover': {
                backgroundColor: 'transparent'
            }
        },
        '&.Mui-selected': {
            backgroundColor: 'transparent',
            '& .MuiListItemIcon-root': {
                color: theme.palette.action.selected,
                borderLeftColor: theme.palette.action.selected,
                borderLeftWidth: 2,
                borderLeftStyle: 'solid',
                '& path': {
                    fill: theme.palette.action.selected
                },
                '&:hover': {
                    color: theme.palette.action.selected,
                    '& path': {
                        fill: theme.palette.action.selected
                    }
                }
            },
            '&:hover': {
                backgroundColor: 'transparent'
            }
        },
        '&:hover': {
            background: 'transparent'
        }
    }
});

type SidebarProps = {
    children: React.ReactNode;
    mobileOpen: boolean;
    onClose?: () => void;
};
export function Sidebar(props: SidebarProps) {
    const theme = useTheme();

    const styles = useStyles(theme);

    const mobileHidden = useMediaQuery(theme.breakpoints.up('sm'));

    const DesktopDrawer = (desktopDrawerProps: { children: React.ReactNode }) => (
        <Drawer open variant="permanent" sx={styles.drawerPaper}>
            {desktopDrawerProps.children}
        </Drawer>
    );

    const MobileDrawer = (mobileDrawerProps: { children: React.ReactNode; open: boolean; onClose?: () => void }) => (
        <Drawer
            onClose={mobileDrawerProps.onClose}
            open={mobileDrawerProps.open}
            variant="temporary"
            sx={styles.mobileDrawerPaper}
            ModalProps={{ keepMounted: true }}>
            {mobileDrawerProps.children}
        </Drawer>
    );

    return (
        <Container>
            {mobileHidden ? (
                <DesktopDrawer>{props.children}</DesktopDrawer>
            ) : (
                <MobileDrawer onClose={props.onClose} open={props.mobileOpen}>
                    {props.children}
                </MobileDrawer>
            )}
        </Container>
    );
}

export const SidebarTooltip = (props: { title: string; children: React.ReactElement }) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return (
        <Tooltip
            componentsProps={styles.tooltip}
            title={<Typography>{props.title}</Typography>}
            arrow
            placement="right"
            enterDelay={300}
            leaveDelay={200}>
            {props.children}
        </Tooltip>
    );
};

export const SidebarListItem = ({ children, ...rest }: React.ComponentProps<typeof ListItemButton>) => {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <ListItemButton sx={styles.listItem} disableGutters disableRipple {...rest}>
            {children}
        </ListItemButton>
    );
};

export const MobileSidebarListItem = ({ children, ...rest }: React.ComponentProps<typeof ListItemButton>) => {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <ListItemButton sx={styles.mobileListItem} disableGutters disableRipple {...rest}>
            {children}
        </ListItemButton>
    );
};

export default Sidebar;

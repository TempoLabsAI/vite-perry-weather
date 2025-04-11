import { Box, SxProps, Theme, Typography, useTheme } from '@mui/material';
import { PWColors } from '../Theme/configs/PWColors';
import { SxStyleGenerator } from '@/perry-weather/types/mui';
import merge from 'lodash.merge';

type DevBannerProps = {
    // PW3 uses process.env.REACT_APP_* environment variables, while MetTool uses import.meta.var.VITE_* environment variables.
    // So just let the consuming app pass in the environment variable however it needs to access it
    environment?: string;
    sx?: {
        banner?: SxProps<Theme>;
        spacer?: SxProps<Theme>;
    };
};

const useStyles: SxStyleGenerator = theme => ({
    banner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '24px',
        backgroundColor: PWColors.dark.danger[800],
        color: theme.palette.common.white,
        padding: '2px 0',
        zIndex: 1000
    },
    spacer: {
        height: '24px'
    }
});

export const DevBanner = ({ environment = 'Local', sx }: DevBannerProps) => {
    const theme = useTheme();
    const styles = useStyles(theme);

    const bannerStyles = merge(styles.banner, sx?.banner);
    const spacerStyles = merge(styles.spacer, sx?.spacer);

    if (environment !== 'production') {
        return (
            <>
                <Box sx={bannerStyles}>
                    <Typography variant="body1">{environment}</Typography>
                </Box>
                <Box sx={spacerStyles} />
            </>
        );
    }
    return null;
};

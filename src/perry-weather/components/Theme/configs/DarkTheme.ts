import { createTheme } from '@mui/material/styles';
import { breakpointOptions } from './PWBreakpointsOptions';
import { PWColors } from './PWColors';
import { overrideMuiOptions } from './PWOverridesOptions';
import { typographyOptions } from './PWTypographyOptions';
import { NotificationEventTypes } from '../../../constants/notifications';

export const DarkTheme = createTheme({
    typography: typographyOptions,
    components: overrideMuiOptions,
    breakpoints: breakpointOptions,
    palette: {
        mode: 'dark',
        primary: {
            main: PWColors.dark.primary[500],
            dark: PWColors.dark.primary[650],
            light: PWColors.dark.primary[300]
        },
        secondary: {
            main: PWColors.dark.base[500],
            dark: PWColors.dark.base[900],
            light: PWColors.dark.base[100]
        },
        info: {
            main: PWColors.dark.primary[600],
            dark: PWColors.dark.primary[900],
            light: PWColors.dark.primary[500]
        },
        error: {
            main: PWColors.dark.danger[600],
            dark: PWColors.dark.danger[900],
            light: PWColors.dark.danger[500]
        },
        warning: {
            main: PWColors.dark.warning[500],
            dark: PWColors.dark.warning[900]
        },
        success: {
            main: PWColors.dark.success[500],
            light: PWColors.dark.success[500],
            dark: PWColors.dark.success[900]
        },
        background: {
            default: PWColors.dark.base[900],
            paper: PWColors.dark.base[700],
            focus: PWColors.dark.base[600],
            disabled: PWColors.dark.base[500],
            error: PWColors.dark.danger[900],
            warning: PWColors.dark.warning[900],
            success: PWColors.dark.success[900]
        },
        text: {
            primary: '#ffffff',
            secondary: PWColors.dark.base[100],
            dark: PWColors.dark.base[900],
            disabled: PWColors.dark.base[400]
        },
        common: {
            black: '#000000',
            white: '#ffffff'
        },
        action: {
            active: '#ffffff',
            inactive: PWColors.dark.base[300],
            hover: '#ffffff',
            hoverOpacity: 0.1,
            hoverSecondary: PWColors.dark.base[400],
            selected: PWColors.dark.primary[500],
            disabled: PWColors.dark.base[500],
            disabledBackground: 'transparent',
            focus: PWColors.dark.primary[500]
        },
        border: {
            main: PWColors.dark.base[500],
            input: PWColors.dark.base[400],
            sidebar: PWColors.light.base[600]
        },
        divider: PWColors.dark.base[500],
        subDivider: PWColors.dark.base[700],
        pill: {
            background: '#ffffff',
            selected: '#80C8B5',
            border: PWColors.light.base[400]
        },
        notificationEventTypes: {
            [NotificationEventTypes.Other]: '#e8df87',
            [NotificationEventTypes.Lightning]: '#DCE16E',
            [NotificationEventTypes.WBGT]: '#D76B5D',
            [NotificationEventTypes.HEAT]: '#D76B5D',
            [NotificationEventTypes.CHILL]: '#1E90FF',
            [NotificationEventTypes.PRECIP]: '#81C8E6',
            [NotificationEventTypes.WIND]: '#707a88',
            [NotificationEventTypes.GUST]: '#707a88',
            [NotificationEventTypes.AQI]: '#CBC3E3',
            [NotificationEventTypes.SIREN]: '#FFFFFF',
            [NotificationEventTypes.NWS]: '#D76B5D',
            [NotificationEventTypes.PROACTIVE_FORECAST]: '#D76B5D'
        }
    }
});

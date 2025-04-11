import { createTheme } from '@mui/material/styles';
import { breakpointOptions } from './PWBreakpointsOptions';
import { PWColors } from './PWColors';
import { overrideMuiOptions } from './PWOverridesOptions';
import { typographyOptions } from './PWTypographyOptions';
import { NotificationEventTypes } from '../../../constants/notifications';

export const LightTheme = createTheme({
    typography: typographyOptions,
    components: overrideMuiOptions,
    breakpoints: breakpointOptions,
    palette: {
        mode: 'light',
        primary: {
            main: PWColors.light.primary[500],
            dark: PWColors.light.primary[600],
            light: PWColors.light.primary[300]
        },
        secondary: {
            main: PWColors.dark.base[500],
            dark: PWColors.dark.base[900],
            light: PWColors.dark.base[100]
        },
        info: {
            main: PWColors.light.primary[600],
            dark: PWColors.light.primary[900],
            light: PWColors.light.primary[500]
        },
        error: {
            main: PWColors.light.danger[600],
            dark: PWColors.light.danger[900],
            light: PWColors.light.danger[500]
        },
        warning: {
            main: PWColors.light.warning[600],
            dark: PWColors.light.warning[900]
        },
        success: {
            main: PWColors.light.success[600],
            light: PWColors.light.success[300],
            dark: PWColors.light.success[900]
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
            focus: '#ffffff',
            disabled: PWColors.light.base[600],
            error: PWColors.light.danger[200],
            warning: PWColors.light.warning[200],
            success: PWColors.light.success[200]
        },
        text: {
            primary: PWColors.light.base[900],
            secondary: PWColors.light.base[600],
            dark: PWColors.light.base[900],
            disabled: PWColors.light.base[200]
        },
        common: {
            black: '#000000',
            white: '#ffffff'
        },
        action: {
            active: '#ffffff',
            inactive: PWColors.light.base[400],
            hover: PWColors.light.base[900],
            hoverOpacity: 0.1,
            hoverSecondary: PWColors.light.base[200],
            selected: PWColors.light.primary[500],
            disabled: PWColors.light.base[200],
            disabledBackground: 'transparent',
            focus: PWColors.light.primary[500]
        },
        border: {
            main: PWColors.light.base[200],
            input: PWColors.light.base[300],
            sidebar: PWColors.light.base[200]
        },
        pill: {
            background: '#ffffff',
            selected: '#99d3c4',
            border: PWColors.light.base[400]
        },
        divider: PWColors.light.base[500],
        subDivider: PWColors.light.base[700],
        notificationEventTypes: {
            [NotificationEventTypes.Other]: '#e8df87',
            [NotificationEventTypes.Lightning]: '#DCE16E',
            [NotificationEventTypes.WBGT]: '#D76B5D',
            [NotificationEventTypes.HEAT]: '#D76B5D',
            [NotificationEventTypes.CHILL]: '#1E90FF',
            [NotificationEventTypes.PRECIP]: '#81C8E6',
            [NotificationEventTypes.WIND]: '#505a68',
            [NotificationEventTypes.GUST]: '#505a68',
            [NotificationEventTypes.AQI]: '#CBC3E3',
            [NotificationEventTypes.SIREN]: '#000000',
            [NotificationEventTypes.NWS]: '#880000',
            [NotificationEventTypes.PROACTIVE_FORECAST]: '#880000'
        }
    }
});

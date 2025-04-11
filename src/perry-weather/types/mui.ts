import { SxProps, Theme } from '@mui/material';
import { NotificationEventTypes } from '../constants/notifications';

export type SxStyleGenerator = (theme: Theme) => { [key: string]: SxProps<Theme> };
export type CssStyleGenerator = (theme: Theme) => { [key: string]: SxProps<Theme> };

declare module '@mui/material/styles/createPalette' {
    interface TypeAction {
        hoverSecondary: string;
        inactive: string;
    }

    interface TypeBackground {
        focus: string;
        disabled: string;
        error: string;
        warning: string;
        success: string;
    }

    interface TypeText {
        dark: string;
    }

    interface TypeBorder {
        main: string;
        input: string;
        sidebar: string;
    }

    interface Palette {
        border: TypeBorder;
        subDivider: string;
        notificationEventTypes: { [key in NotificationEventTypes]: string };
        pill: {
            background: string;
            selected: string;
            border: string;
        };
    }

    interface PaletteOptions {
        border: Partial<TypeBorder>;
        subDivider: string;
        notificationEventTypes: { [key in NotificationEventTypes]: string };
        pill: {
            background: string;
            selected: string;
            border: string;
        };
    }
}

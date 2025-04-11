import { Components } from '@mui/material';
import { PWColors } from './PWColors';

export const overrideMuiOptions: Components = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 100
            }
        }
    },
    MuiAppBar: {
        defaultProps: {
            // enableColorOnDark: true,
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                // backgroundColor: PWColors.dark.base[800],
                borderRadius: 8,
                border: '1px solid',
                borderColor: PWColors.dark.base[500],
                boxShadow: '0px 20px 44px rgba(0, 0, 0, 0.13)'
            }
        }
    }
};

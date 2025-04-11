import { TypographyOptions } from '@mui/material/styles/createTypography';

export const typographyOptions: TypographyOptions = {
    fontFamily: ['proxima-nova'].join(','),
    h1: {
        fontSize: 64,
        lineHeight: '64px',
        fontStyle: 'normal',
        fontWeight: 'normal',
        letterSpacing: -1.5
    },
    h2: {
        fontSize: 48,
        lineHeight: '56px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -1.5
    },
    h3: {
        fontSize: 40,
        lineHeight: '48px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -1
    },
    h4: {
        fontSize: 32,
        lineHeight: '40px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.5
    },
    h5: {
        fontSize: 24,
        lineHeight: '32px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.5
    },
    h6: {
        fontSize: 20,
        lineHeight: '32px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.25
    },
    subtitle1: {
        fontSize: 16,
        lineHeight: '24px',
        fontWeight: 'bold',
        fontStyle: 'normal'
    },
    body1: {
        fontSize: 16,
        lineHeight: '24px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: -0.15
    },
    caption: {
        fontSize: 12,
        lineHeight: '16px',
        fontWeight: 'normal',
        fontStyle: 'normal'
    },
    overline: {
        fontSize: 11,
        lineHeight: '16px',
        fontWeight: 'bold',
        fontStyle: 'normal',
        textTransform: 'uppercase',
        letterSpacing: 1
    }
};

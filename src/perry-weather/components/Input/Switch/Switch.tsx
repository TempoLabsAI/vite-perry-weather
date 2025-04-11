import { FormControlLabel, Switch as MuiSwitch, styled, SxProps, Theme } from '@mui/material';
import merge from 'lodash.merge';
import { CSSProperties } from 'react';

const CustomSwitch = styled(MuiSwitch)(({ theme }) => ({
    padding: 0,
    width: 44,
    height: 24,
    borderRadius: 12,
    '& .MuiSwitch-thumb': {
        color: theme.palette.action.active
    },
    '& .MuiSwitch-track': {
        backgroundColor: theme.palette.action.inactive,
        opacity: 1
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked + .MuiSwitch-track': {
            opacity: 1
        }
    }
}));

interface SwitchProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    checked?: boolean;
    style?: CSSProperties;
    label?: string;
    sx?: {
        switch?: SxProps<Theme>;
    };
}

export function Switch(props: SwitchProps) {
    const { onChange, checked = false, style, label, sx } = props;

    const switchStyles = merge(style, sx?.switch);
    const BaseSwitch = <CustomSwitch sx={switchStyles} checked={checked} onChange={onChange}></CustomSwitch>;

    if (label) {
        const typographyStyle = { typography: { sx: { marginLeft: 2 } } };
        return <FormControlLabel control={BaseSwitch} label={label} slotProps={typographyStyle} />;
    }

    return BaseSwitch;
}

export default Switch;

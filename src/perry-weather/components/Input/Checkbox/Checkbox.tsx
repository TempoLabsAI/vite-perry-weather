import { FormControlLabel, Checkbox as MuiCheckbox, SxProps, Theme, useTheme } from '@mui/material';
import merge from 'lodash.merge';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { SxStyleGenerator } from '@/perry-weather/types/mui';

interface CheckboxProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
    checked?: boolean;
    label?: string;
    sx?: {
        checkbox?: SxProps<Theme>;
    };
}

const useStyles: SxStyleGenerator = theme => ({
    checkbox: {
        '&:hover': {
            color: theme.palette.action.hover
        }
    }
});

export function Checkbox(props: CheckboxProps) {
    const { onChange, checked = false, disabled = false, label, sx } = props;
    const [state, setCheckedState] = useState(checked);

    const theme = useTheme();
    const styles = useStyles(theme);
    const checkboxStyles = merge(styles.checkbox, sx?.checkbox);

    useEffect(() => {
        setCheckedState(checked);
    }, [checked]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedState(event.target.checked);
        if (onChange !== undefined) onChange(event);
    };

    const BaseCheckmark = <MuiCheckbox disabled={disabled} onChange={handleChange} checked={state} color="primary" sx={checkboxStyles} />;

    if (label) {
        return <FormControlLabel control={BaseCheckmark} label={label} />;
    }

    return BaseCheckmark;
}

export default Checkbox;

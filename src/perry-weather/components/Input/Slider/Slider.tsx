import { Grid, Slider as MuiSlider, styled, Typography, useTheme, GridSize, SxProps, Theme } from '@mui/material';
import { useEffect, useState } from 'react';

const CustomSlider = styled(MuiSlider)(({ theme }) => ({
    height: 8,
    '& .MuiSlider-rail': {
        height: 8,
        borderRadius: 8,
        background: theme.palette.action.inactive,
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.05)'
    },
    '& .MuiSlider-track': {
        height: 8,
        borderRadius: 8,
        border: 0
    },
    '& .MuiSlider-thumb': {
        height: 16,
        width: 16,
        color: theme.palette.action.active
    },
    '& .Mui-disabled': {
        backgroundColor: theme.palette.action.disabledBackground
    }
}));

interface SliderProps {
    value: number;
    unit?: string;
    displayValue?: boolean;
    backgroundColor?: string;
    max?: number;
    min?: number;
    step?: number;
    customDisplay?: string;
    displayValueSize?: boolean | GridSize;
    softMax?: number;
    softMin?: number;
    disabled?: boolean;
    onChange?: (value: number) => void;
    onChangeCommit?: (value: number) => void;
    sx?: {
        slider: SxProps<Theme>;
    };
}

export function Slider(props: SliderProps) {
    const {
        value,
        unit,
        backgroundColor,
        displayValue = false,
        softMin,
        softMax,
        max,
        min,
        customDisplay,
        disabled,
        displayValueSize,
        step,
        onChange,
        onChangeCommit,
        sx
    } = props;
    const theme = useTheme();

    const [sliderValue, setSliderValue] = useState(value || 0);

    useEffect(() => {
        setSliderValue(value);
    }, [value]);

    const handleChange = (value: number) => {
        if (value <= (softMax || max || 100) && value >= (softMin || min || 0)) {
            setSliderValue(value);
            if (onChange !== undefined) onChange(value);
        }
    };

    const sliderStyles = {
        '& .MuiSlider-track': {
            background: backgroundColor
        },
        ...sx?.slider
    };

    return (
        <Grid container>
            <Grid item xs>
                <CustomSlider
                    step={step}
                    disabled={disabled}
                    max={max}
                    min={min}
                    value={sliderValue}
                    onChange={(e, value) => handleChange(value as number)}
                    sx={sliderStyles}
                    onChangeCommitted={onChangeCommit !== undefined ? (e, v) => onChangeCommit(v as number) : undefined}
                />
            </Grid>
            {(displayValue || customDisplay) && (
                <Grid item xs={displayValueSize || 3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Typography variant="body1">{customDisplay !== undefined ? customDisplay : sliderValue}</Typography>
                    {unit && (
                        <Typography variant="body1" style={{ paddingLeft: 4, color: theme.palette.text.secondary }}>
                            {unit}
                        </Typography>
                    )}
                </Grid>
            )}
        </Grid>
    );
}

export default Slider;

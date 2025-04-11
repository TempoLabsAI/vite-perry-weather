import { FormControlLabel, Radio as MuiRadio, styled, SxProps, Theme, useTheme } from '@mui/material';
import merge from 'lodash.merge';
import { SxStyleGenerator } from '@/perry-weather/types/mui';

const CustomRadio = styled(MuiRadio)``;

interface RadioProps {
    value: string;
    size?: 'small' | 'medium';
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    checked?: boolean;
    label?: string;
    sx?: {
        radio?: SxProps<Theme>;
    };
}

const useStyles: SxStyleGenerator = theme => ({
    radio: {
        color: theme.palette.border.input,
        '&:hover': {
            color: theme.palette.action.hover
        }
    }
});

export function Radio(props: RadioProps) {
    const { onChange, size, checked, value, label, sx } = props;
    const theme = useTheme();
    const styles = useStyles(theme);
    const radioStyles = merge(styles.radio, sx?.radio);

    const BaseRadio = <CustomRadio onChange={onChange} checked={checked} value={value} size={size} sx={radioStyles} />;

    if (label) {
        return <FormControlLabel control={BaseRadio} label={label} />;
    }
    return BaseRadio;
}

export default Radio;

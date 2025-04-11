import { Chip, ChipProps, SxProps, Theme, useTheme } from '@mui/material';
import { PWColors } from '../Theme/configs/PWColors';
import merge from 'lodash.merge';

type PillProps = ChipProps & {
    selected?: boolean;
    selectedIcon?: React.ReactElement;
    sx?: {
        chip?: SxProps;
        selected?: SxProps;
    };
};

const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
    chip: {
        '&.MuiChip-root': {
            borderRadius: '4px',
            border: `1px solid ${theme.palette.pill.border}`,
            backgroundColor: theme.palette.common.white,
            padding: '4px 8px'
        },
        '& .MuiChip-label, .MuiChip-avatar, .MuiChip-deleteIcon': {
            color: PWColors.light.base[900],
            '&:hover': {
                color: PWColors.light.base[900]
            }
        }
    },
    selected: {
        '&.MuiChip-root': {
            borderRadius: '4px',
            backgroundColor: theme.palette.pill.selected,
            padding: '4px 8px'
        },
        '& .MuiChip-label, .MuiChip-avatar, .MuiChip-deleteIcon': {
            color: '#4A4459'
        }
    }
});

export const Pill = (props: PillProps) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    const { selected = false, selectedIcon, avatar, sx, ...rest } = props;
    const chipStyles = props.selected ? merge(styles.selected, sx?.selected) : merge(styles.chip, sx?.chip);

    const leftIcon = selected && selectedIcon ? selectedIcon : avatar;
    return <Chip sx={chipStyles} {...rest} avatar={leftIcon} />;
};

import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps, tooltipClasses, styled } from '@mui/material';
import { PWColors } from '../Theme/configs/PWColors';

export const CustomTooltip = styled(MuiTooltip)(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: PWColors.dark.base[300],
        fontSize: 14
    }
}));

export function Tooltip(props: MuiTooltipProps) {
    const { children, ...tooltipProps } = props;

    return <CustomTooltip {...tooltipProps}>{children}</CustomTooltip>;
}

export default Tooltip;

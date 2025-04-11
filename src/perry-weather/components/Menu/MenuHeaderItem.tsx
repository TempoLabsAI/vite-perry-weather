import { ListSubheader, ListSubheaderProps, styled, useTheme } from '@mui/material';

const StyledMenuHeaderItem = styled(ListSubheader, {
    shouldForwardProp: prop => prop !== 'success'
})<ListSubheaderProps>(() => ({
    '&.Mui-disabled': {
        ...{
            opacity: 1
        }
    }
}));

export function PWMenuHeaderItem(props: ListSubheaderProps) {
    const theme = useTheme();

    return <StyledMenuHeaderItem {...props} theme={theme} tabIndex={undefined} />;
}

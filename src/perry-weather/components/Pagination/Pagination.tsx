import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { styled, Pagination as MuiPagination, PaginationItem, IconButton, useTheme, SxProps, Theme } from '@mui/material';

interface PaginationProps {
    count?: number;
    page?: number;
    onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
    sx?: {
        pagination?: SxProps<Theme>;
        nextIconButton?: SxProps<Theme>;
        previousIconButton?: SxProps<Theme>;
    };
}

const CustomPagination = styled(MuiPagination)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    '& .MuiButtonBase-root': {
        width: 48,
        height: 48,
        borderRadius: 100
    },
    '& .Mui-selected': {
        backgroundColor: theme.palette.action.inactive
    },
    '& .MuiPaginationItem-root:hover': {
        backgroundColor: theme.palette.action.focus
    },
    '& .MuiPaginationItem-previousNext': {
        color: theme.palette.action.selected,
        borderColor: theme.palette.action.selected,
        border: '1px solid'
    },
    '& .Mui-disabled .MuiPaginationItem-previousNext': {
        borderColor: theme.palette.action.disabled,
        color: theme.palette.action.disabled,
        opacity: 1
    }
}));

const CustomIconButton = styled(IconButton)(() => ({
    border: '1px solid',
    width: 48,
    height: 48
}));

export function Pagination(props: PaginationProps) {
    const { count, page = 1, onChange, sx } = props;

    const theme = useTheme();

    const isSmall = theme.breakpoints.down('md');

    const handleOnClick = (event: React.ChangeEvent<unknown>, page: number) => {
        if (onChange) onChange(event, page);
    };

    return (
        <CustomPagination
            size={isSmall ? 'small' : 'large'}
            count={count}
            page={page}
            onChange={onChange}
            sx={sx?.pagination}
            renderItem={item => {
                if (item.type === 'previous') {
                    return (
                        <CustomIconButton
                            size={isSmall ? 'small' : 'large'}
                            color="primary"
                            disabled={page === 1}
                            onClick={e => handleOnClick(e, page - 1)}
                            sx={{ marginRight: 2, ...sx?.previousIconButton }}>
                            <ArrowBack />
                        </CustomIconButton>
                    );
                } else if (item.type === 'next') {
                    return (
                        <CustomIconButton
                            size={isSmall ? 'small' : 'large'}
                            color="primary"
                            disabled={page === count || count === 0}
                            onClick={e => handleOnClick(e, page + 1)}
                            sx={{ marginLeft: 2, ...sx?.nextIconButton }}>
                            <ArrowForward />
                        </CustomIconButton>
                    );
                } else {
                    return <PaginationItem {...item}></PaginationItem>;
                }
            }}></CustomPagination>
    );
}

export default Pagination;

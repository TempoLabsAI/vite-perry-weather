import { IconButton, InputAdornment, TextField, styled, BaseTextFieldProps, SxProps, Theme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useEffect, useState } from 'react';

const CustomSearchField = styled(
    TextField,
    {}
)<BaseTextFieldProps>(({ theme }) => ({
    width: '100%',
    autoCorrect: 'email name organization username',
    '& .MuiOutlinedInput-root': {
        height: 48,
        '& .MuiInputAdornment-positionEnd .MuiIconButton-root': {
            color: theme.palette.text.primary,
            zIndex: 1
        },
        '& .MuiInputAdornment-positionStart': {
            marginLeft: 8,
            color: theme.palette.text.primary,
            zIndex: 1
        }
    },
    '& .MuiOutlinedInput-adornedEnd ': {
        padding: 0
    },
    '& .Mui-focused': {
        border: 0,
        '& .MuiOutlinedInput-notchedOutline': {
            background: theme.palette.background.focus,
            borderWidth: '1px !important',
            boxShadow: '0px 0px 0px 2px #0F151E, 0px 0px 0px 4px rgba(96, 177, 215, 0.3)'
        }
    },
    '& .MuiOutlinedInput-input': {
        zIndex: 1
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
        border: '1px solid',
        borderColor: theme.palette.action.disabled,
        borderRadius: 100
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid',
        borderColor: theme.palette.border.input,
        borderRadius: 100
    },
    '&:hover .Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid',
        borderColor: theme.palette.action.focus
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.border.input
    },
    '& .Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.error.light
    }
}));

interface SearchFieldProps {
    value?: string;
    placeholder?: string;
    style?: React.CSSProperties;
    handleSearch: (searchString: string) => void;
    disabled?: boolean;
    additionalEndAdornment?: React.ReactElement;
    debounce?: number; // In milliseconds
    sx?: {
        searchField?: SxProps<Theme>;
    };
}

export function SearchField(props: SearchFieldProps) {
    const { value = '', placeholder, handleSearch, style, disabled = false, debounce = 300, sx } = props;
    const [text, setText] = useState(value);
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

    const handleClearSearchField = () => {
        setText('');
        handleSearch('');
    };

    useEffect(() => {
        if (value) {
            setText(value);
        }
    }, [value]);

    const onChange = (text: string) => {
        setText(text);
        if (text.length > 2 || text === '') {
            if (timer) clearTimeout(timer);

            setTimer(
                setTimeout(() => {
                    handleSearch(text);
                }, debounce)
            );
        }
    };

    const getStartAdornment = () => {
        return <SearchIcon />;
    };

    const getEndAdornment = () => {
        return (
            <IconButton onClick={handleClearSearchField} size="large">
                {text.length > 0 ? <CancelOutlinedIcon /> : <></>}{' '}
            </IconButton>
        );
    };

    return (
        <CustomSearchField
            type="text"
            placeholder={placeholder}
            variant="outlined"
            value={text}
            disabled={disabled}
            sx={sx?.searchField}
            onChange={e => {
                onChange(e.target.value);
            }}
            style={style}
            InputProps={{
                startAdornment: <InputAdornment position="start">{getStartAdornment()}</InputAdornment>,
                endAdornment: (
                    <>
                        <InputAdornment position="end">{getEndAdornment()}</InputAdornment>
                        {props.additionalEndAdornment && (
                            <InputAdornment position="end" sx={{ zIndex: 10000 }}>
                                {props.additionalEndAdornment}
                            </InputAdornment>
                        )}
                    </>
                )
            }}
        />
    );
}

export default SearchField;

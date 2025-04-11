import { IconButton, InputAdornment, TextField as MuiTextField, styled, BaseTextFieldProps } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';

export const CustomTextField = styled(
    MuiTextField,
    {}
)<BaseTextFieldProps>(({ theme }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        height: 48,
        '& .MuiInputAdornment-root .MuiIconButton-root': {
            color: theme.palette.action.inactive
        }
    },
    '& .MuiOutlinedInput-adornedEnd ': {
        padding: 0
    },
    '& .MuiOutlinedInput-root.Mui-error': {
        '& .MuiInputAdornment-root': {
            color: theme.palette.error.light
        }
    },
    '& .Mui-focused': {
        border: 0,
        '& .MuiOutlinedInput-notchedOutline': {
            // background: theme.palette.background.focus,
            borderWidth: '1px !important',
            boxShadow: '0px 0px 0px 2px #0F151E, 0px 0px 0px 4px rgba(96, 177, 215, 0.3)'
        }
    },
    '& .MuiOutlinedInput-input': {
        padding: '12px 0px 12px 24px',
        zIndex: 1
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
        border: '1px solid',
        borderColor: theme.palette.action.disabled
    },
    '&:hover .Mui-disabled .MuiOutlinedInput-notchedOutline': {
        border: '1px solid',
        borderColor: theme.palette.action.disabled
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 1,
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
    },
    '& .MuiFormHelperText-root.Mui-error': {
        color: theme.palette.error.main,
        fontSize: 12,
        marginLeft: 0
    }
}));

interface TextFieldProps {
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    type?: 'text' | 'password' | 'number';
    value?: string;
    placeholder?: string;
    helperText?: string;
    isError?: boolean;
    disabled?: boolean;
    endAdornment?: JSX.Element;
    disablePassPreview?: boolean;
    autoComplete?: string;
    label?: string;
    readonly?: boolean;
    inputMode?: 'text' | 'search' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
}

export function TextField(props: TextFieldProps) {
    const {
        onChange,
        type = 'text',
        value = '',
        placeholder,
        helperText,
        readonly = false,
        isError = false,
        disabled = false,
        endAdornment,
        disablePassPreview = false,
        autoComplete,
        label = '',
        inputMode
    } = props;
    const [text, setText] = useState(value);
    const [isVisible, setVisibility] = useState(false);
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
        if (value) setText(value);
    }, [value]);

    const handleClickShowPassword = () => {
        setVisibility(!isVisible);
        if (isVisible) {
            setInputType('password');
        } else {
            setInputType('text');
        }
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const getAdornment = () => {
        return isError ? (
            <ErrorOutlineIcon />
        ) : type === 'password' && !(disabled || disablePassPreview) ? (
            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} size="large">
                {' '}
                {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
        ) : (
            <></>
        );
    };

    return (
        <CustomTextField
            type={inputType}
            autoComplete={autoComplete}
            inputMode={inputMode}
            inputProps={{ readOnly: readonly }}
            error={isError}
            label={label}
            disabled={disabled}
            placeholder={placeholder}
            variant="outlined"
            onChange={e => {
                setText(e.target.value);
                if (onChange !== undefined) {
                    onChange(e);
                }
            }}
            onBlur={() => setText(value)}
            value={text}
            helperText={helperText}
            InputProps={{
                endAdornment: <InputAdornment position="end">{endAdornment || getAdornment()}</InputAdornment>
            }}
        />
    );
}

export default TextField;

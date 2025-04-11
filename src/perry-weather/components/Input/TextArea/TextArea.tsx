import { TextField as MuiTextField, styled, BaseTextFieldProps, Theme, SxProps } from '@mui/material';

const CustomTextArea = styled(MuiTextField, { shouldForwardProp: prop => prop !== 'resize' })<BaseTextFieldProps & { resize: boolean }>(
    ({ theme, resize }) => ({
        width: '100%',
        height: '100%',
        '& .MuiInputBase-root, textarea': {
            height: '100% !important',
            resize: resize ? 'both' : 'none'
        },
        '& .MuiOutlinedInput-root': {
            padding: '12px 12px 12px 12px'
        },
        '& .Mui-focused': {
            border: 0,
            '& .MuiOutlinedInput-notchedOutline': {
                background: theme.palette.background.focus,
                borderWidth: '1px !important',
                borderColor: theme.palette.action.focus,
                boxShadow: '0 0 0 3px #1F4676'
            }
        },
        '& .MuiOutlinedInput-input': {
            zIndex: 1
        },
        '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.action.disabled,
            background: theme.palette.background.focus
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.palette.border.input
        },
        '&:hover .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
            borderColor: theme.palette.action.focus
        },
        '&:hover .Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.action.disabled,
            background: theme.palette.background.focus
        }
    })
);

interface TextAreaProps {
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    isError?: boolean;
    helperText?: React.ReactNode;
    sx?: SxProps<Theme>;
    resize?: boolean;
    readonly?: boolean;
}

export function TextArea(props: TextAreaProps) {
    const { onChange, value, readonly = false, placeholder, disabled = false, resize = false, isError = false, helperText, sx } = props;

    return (
        <CustomTextArea
            sx={sx}
            helperText={helperText}
            error={isError}
            disabled={disabled}
            placeholder={placeholder}
            inputProps={{ readOnly: readonly }}
            variant="outlined"
            onChange={onChange}
            multiline
            resize={resize}
            minRows={4}
            maxRows={10}
            value={value}
        />
    );
}

export default TextArea;

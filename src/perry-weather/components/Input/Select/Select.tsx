import { Select as MUISelect, SelectChangeEvent, Theme, Typography } from '@mui/material';
import { SxProps, useTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { PWMenuItem } from '../../Menu/MenuItem';
import { PWMenuHeaderItem } from '../../Menu/MenuHeaderItem';

export interface SelectOption {
    value: string | number;
    text: string;
    bold?: boolean;
    italic?: boolean;
    isHeader?: boolean;
}

export interface SelectOptionWithChildren extends SelectOption {
    children?: SelectOption[];
}

interface SelectProps {
    value?: string | number;
    disabled?: boolean;
    options: SelectOption[] | SelectOptionWithChildren[];
    placeholder?: string;
    isError?: boolean;
    sx?: React.ComponentProps<typeof MUISelect>['sx'];
    onChange?: (value: string, name: string) => void;
    renderValue?: (option?: SelectOption) => JSX.Element;
    renderMenuItem?: (option: SelectOption, selectedValue?: string | number) => JSX.Element;
    renderHeaderItem?: (option: SelectOption, selectedValue?: string | number) => JSX.Element;
}

const flattenOptions = (options: SelectOptionWithChildren[]): SelectOption[] => {
    return options.reduce((acc, option) => {
        if (option.children) {
            const header = {
                text: option.text,
                value: 'h-' + option.value.toString(),
                isHeader: true
            } as SelectOption;
            return [...acc, header, ...flattenOptions(option.children)];
        } else {
            return [...acc, option];
        }
    }, [] as SelectOption[]);
};

const findOption = (options: SelectOption[], value: string | number): SelectOption | undefined => {
    for (const option of options) {
        //have to allow type coercion here.
        if (option.isHeader === undefined && option.value == value) {
            return option;
        }
    }
    return undefined;
};

const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
    select: {
        width: '100%',
        height: 48,
        '& .MuiOutlinedInput-root': {
            height: 'inherit',
            '& .MuiInputAdornment-root .MuiIconButton-root': {
                color: theme.palette.action.inactive
            }
        },
        '& .MuiOutlinedInput-adornedEnd ': {
            padding: 0
        },
        '& p': {
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        '& .MuiSvgIcon-root': {
            padding: 0,
            color: theme.palette.text.primary
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            // background: theme.palette.background.focus,
            borderWidth: '1px !important',
            boxShadow: '0px 0px 0px 2px #0F151E, 0px 0px 0px 4px rgba(96, 177, 215, 0.3)'
        },
        '& .MuiOutlinedInput-root.Mui-error': {
            '& .MuiInputAdornment-root': {
                color: theme.palette.error.light
            }
        },
        '& .MuiOutlinedInput-input': {
            padding: '12px 32px 12px 14px',
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
        '& .Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.light
        }
    },
    menuItem: {
        '&:hover': {
            backgroundColor: theme.palette.action.hoverSecondary
        }
    }
});

export function Select(props: SelectProps) {
    const theme = useTheme();
    const { value, options, disabled, placeholder, onChange, renderValue, renderMenuItem, renderHeaderItem, isError = false, sx } = props;
    const classes = useStyles(theme);
    const [selectValue, setSelection] = useState<string>('');

    const MenuProps = {
        PaperProps: {
            style: {
                borderRadius: 8,
                background: theme.palette.background.default,
                border: '1px solid',
                borderColor: theme.palette.border.main
            }
        }
    };

    const optionsFlat = flattenOptions(options);

    const handleSelect = (event: SelectChangeEvent) => {
        if (event?.target?.value !== undefined) {
            setSelection(event.target.value);
            if (onChange !== undefined) onChange(event.target.value, findOption(optionsFlat, event.target.value)?.text as string);
        }
    };

    useEffect(() => {
        if (value !== undefined && value !== '') {
            if (typeof value === 'string') {
                setSelection(value);
            } else if (typeof value === 'number') {
                setSelection(value.toString());
            }
        }
    }, [value]);

    const selectClasses = { ...classes.select };
    const menuItemClasses = { ...classes.menuItem };

    const renderOptionItems = (option: SelectOption): JSX.Element | JSX.Element[] => {
        if (option.isHeader) {
            if (renderHeaderItem) {
                return renderHeaderItem(option, value);
            } else {
                return (
                    <PWMenuHeaderItem
                        aria-disabled
                        key={option.value}
                        style={{
                            fontStyle: 'normal',
                            fontWeight: 'bold'
                        }}>
                        {option.text}
                    </PWMenuHeaderItem>
                );
            }
        } else {
            if (renderMenuItem) {
                return renderMenuItem(option, value);
            } else {
                return (
                    <PWMenuItem
                        key={option.value}
                        value={option.value}
                        sx={{
                            ...menuItemClasses,
                            '&:hover': {
                                backgroundColor: theme.palette.action.hoverSecondary
                            }
                        }}>
                        {option.value === '' ? (
                            <div style={{ fontStyle: 'italic' }}>{option.text || option.value}</div>
                        ) : (
                            <div
                                style={{
                                    fontStyle: option.italic ? 'italic' : 'normal',
                                    fontWeight: option.bold ? 'bold' : 'normal'
                                }}>
                                {option.text || option.value}
                            </div>
                        )}
                    </PWMenuItem>
                );
            }
        }
    };

    const _renderValue = () => {
        if (selectValue !== undefined && selectValue !== '') {
            const option = findOption(optionsFlat, selectValue);
            if (renderValue) {
                return renderValue(option);
            }
            return <Typography>{option?.text}</Typography>;
        } else {
            return <Typography color={theme.palette.action.inactive}>{placeholder}</Typography>;
        }
    };

    return (
        <MUISelect
            value={selectValue}
            disabled={disabled || false}
            error={isError}
            variant="outlined"
            placeholder={placeholder}
            onChange={handleSelect}
            displayEmpty
            sx={{ ...selectClasses, ...sx }}
            MenuProps={MenuProps}
            renderValue={_renderValue}>
            {optionsFlat.map(renderOptionItems)}
        </MUISelect>
    );
}

import { Select as MUISelect, SelectChangeEvent, Theme, Typography } from '@mui/material';
import { ComponentProps, useEffect } from 'react';
import { useState } from 'react';
import { SelectOption } from './Select';
import { SxProps, useTheme } from '@mui/material/styles';
import { PWMenuItem } from '../../Menu/MenuItem';
import merge from 'lodash.merge';
import { SxStyleGenerator } from '@/perry-weather/types/mui';

interface SelectProps {
    value: string[] | number[];
    disabled?: boolean;
    options: SelectOption[];
    placeholder?: string;
    onChange?: (values: string[]) => void;
    onBlur?: (values: string[]) => void;
    renderValue?: React.ReactNode;
    isError?: boolean;
    helperText?: string;
    renderMenuItem?: (option: SelectOption, selectedValues: string[] | number[]) => JSX.Element;
    sx?: {
        select?: SxProps<Theme>;
        menu?: ComponentProps<typeof MUISelect>['MenuProps'];
        menuItem?: SxProps<Theme>;
    };
}

const useStyles: SxStyleGenerator = theme => ({
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
        '& .MuiOutlinedInput-root.Mui-error': {
            '& .MuiInputAdornment-root': {
                color: theme.palette.error.light
            }
        },
        '& .MuiSelect-select:focus': {
            borderRadius: 100,
            background: 'none',
            border: '1px solid',
            borderColor: theme.palette.action.selected,
            boxShadow: '0px 0px 0px 2px #0F151E, 0px 0px 0px 4px rgba(96, 177, 215, 0.3)'
        },
        '& .MuiOutlinedInput-input': {
            padding: '12px 32px 12px 14px',
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
        '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '1px solid',
            borderRadius: 100
        },
        '& .Mui-error .MuiOutlinedInput-notchedOutline': {
            color: theme.palette.error.light,
            borderColor: theme.palette.error.light
        }
    },
    menuItem: {
        '&:hover': {
            backgroundColor: theme.palette.action.hoverSecondary
        }
    }
});

const useMenuStyles = (theme: Theme) => ({
    menu: {
        PaperProps: {
            style: {
                borderRadius: 8,
                background: theme.palette.background.default,
                border: '1px solid',
                borderColor: theme.palette.border.main
            }
        }
    }
});

export function MultiSelect(props: SelectProps) {
    const theme = useTheme();
    const { value, options, placeholder, renderValue, renderMenuItem, disabled, onChange, onBlur, isError, helperText, sx } = props;
    const classes = useStyles(theme);
    const menuClasses = useMenuStyles(theme);
    const [selectValues, setSelection] = useState<string[]>([]);

    const handleSelect = (event: SelectChangeEvent<typeof selectValues>) => {
        const {
            target: { value }
        } = event;
        setSelection(value as string[]);
        if (onChange !== undefined) onChange(typeof value === 'string' ? value.split(',') : value);
    };

    useEffect(() => {
        if (value) {
            setSelection(value as string[]);
        }
    }, [value]);

    const selectStyles = merge(classes.select, sx?.select);
    const menuStyles = merge(menuClasses, sx?.menu) as ComponentProps<typeof MUISelect>['MenuProps'];
    const menuItemStyles = merge(classes.menuItem, sx?.menuItem);

    return (
        <>
            <MUISelect
                disabled={disabled || false}
                multiple
                error={isError}
                displayEmpty
                value={selectValues}
                placeholder={placeholder}
                style={{ overflow: 'ellipsis' }}
                variant="outlined"
                onChange={handleSelect}
                onBlur={() => {
                    if (onBlur) onBlur(selectValues || []);
                }}
                sx={selectStyles}
                MenuProps={menuStyles}
                renderValue={
                    selectValues.length > 0
                        ? renderValue
                            ? () => renderValue
                            : undefined
                        : () => (
                              <Typography textAlign="left" color={theme.palette.action.inactive}>
                                  {placeholder}
                              </Typography>
                          )
                }>
                {options.map(
                    renderMenuItem
                        ? option => {
                              return renderMenuItem(option, value);
                          }
                        : option => {
                              return (
                                  <PWMenuItem
                                      key={option.value}
                                      value={option.value}
                                      sx={{
                                          fontStyle: option.italic ? 'italic' : 'normal',
                                          fontWeight: option.bold ? 'bold' : 'normal',
                                          ...menuItemStyles
                                      }}>
                                      {option.text || option.value}
                                  </PWMenuItem>
                              );
                          }
                )}
            </MUISelect>
            {helperText && (
                <Typography variant="caption" color={theme.palette.error.main}>
                    {helperText}
                </Typography>
            )}
        </>
    );
}

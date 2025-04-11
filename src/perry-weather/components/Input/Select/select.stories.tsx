import type { Meta, StoryObj } from '@storybook/react';

import { Select, SelectOption } from './Select';
import { PWMenuItem } from '../../Menu/MenuItem';
import { PWMenuHeaderItem } from '../../Menu/MenuHeaderItem';
import { Box, Grid, Typography } from '@mui/material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Select Dropdown',
    component: Select,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
    {
        value: -1,
        text: 'Dropdown Option -1'
    },
    {
        value: 0,
        text: 'Dropdown Option 0N'
    },
    {
        value: '1',
        text: 'Dropdown Option 1'
    },
    {
        value: '2',
        text: 'Dropdown Option 2'
    },
    {
        value: '3',
        text: 'Dropdown Option 3'
    }
];

const specialOption = {
    id: 1,
    value: '1'
};

const optionsWithHeaders = [
    {
        value: 0,
        text: 'Header 0',
        children: [
            { value: -1, text: 'Dropdown Option -1' },
            { value: 0, text: 'Dropdown Option 0' }
        ]
    },
    {
        value: 'Temp',
        text: 'Header 1',
        children: [
            { value: 1, text: 'Dropdown Option 1' },
            { value: 2, text: 'Dropdown Option 2' }
        ]
    },
    {
        value: 'AQI',
        text: 'Header 2',
        children: [
            { value: '3', text: 'Dropdown Option 3' },
            { value: '4', text: 'Dropdown Option 4' }
        ]
    },
    {
        value: 'Wind',
        text: 'Header 3',
        children: [
            { value: 'Another option', text: 'Dropdown Option 5' },
            { value: 3.9355, text: 'Dropdown Option 3.9355' },
            { value: specialOption, text: 'Dropdown Special Option' }
        ]
    }
];

export const StandardSelect: Story = {
    args: {
        value: '1',
        options
    }
};

export const SelectWith0Value: Story = {
    args: {
        value: 0,
        options
    }
};

export const SelectWithOnChangeListener: Story = {
    args: {
        value: '1',
        options,
        onChange: (value, text) => alert(`Selected value: ${value}, Selected text: ${text}`)
    }
};

export const DisabledSelect: Story = {
    args: {
        disabled: true,
        value: '1',
        options
    }
};

export const SelectWithPlaceholder: Story = {
    args: {
        placeholder: 'Select an option',
        options
    }
};

export const SelectWithHeaders: Story = {
    args: {
        placeholder: 'Select an option',
        options: optionsWithHeaders
    }
};

export const SelectWithError: Story = {
    args: {
        value: '1',
        options,
        isError: true
    }
};

export const SelectWithCustomValueRender: Story = {
    args: {
        value: '1',
        options,
        renderValue: option => (
            <Grid container alignItems={'center'}>
                <Box sx={{ width: '12px', height: '32px', borderRadius: '4px 0 0 4px', backgroundColor: 'red', marginRight: '12px' }} />
                <Typography>{option?.text}</Typography>
            </Grid>
        )
    }
};

export const SelectWithCustomStylingSxProps: Story = {
    args: {
        value: '1',
        options,
        sx: {
            '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: '8px'
            }
        },
        renderValue: option => (
            <Grid container alignItems={'center'}>
                <Box sx={{ width: '12px', height: '32px', borderRadius: '4px 0 0 4px', backgroundColor: 'red', marginRight: '12px' }} />
                <Typography>{option?.text}</Typography>
            </Grid>
        )
    }
};

export const SelectWithCustomMenuItems: Story = {
    args: {
        value: '1',
        options,
        renderMenuItem: option => (
            <PWMenuItem sx={{ color: 'green' }} key={option.value} value={option.value}>
                {option.text}
            </PWMenuItem>
        )
    }
};

export const SelectWithCustomHeaderItems: Story = {
    args: {
        placeholder: 'Select an option',
        options: optionsWithHeaders,
        onChange: (value, text) => alert(`Selected value: ${value}, Selected text: ${text}`),
        renderHeaderItem: (option: SelectOption) => (
            <PWMenuHeaderItem
                key={option.value}
                style={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                }}>
                {option.text}
            </PWMenuHeaderItem>
        ),
        renderMenuItem: (option: SelectOption) => {
            return (
                <PWMenuItem
                    key={option.value}
                    value={option.value}
                    style={{
                        marginLeft: '20px'
                    }}>
                    {option.text}
                </PWMenuItem>
            );
        }
    }
};

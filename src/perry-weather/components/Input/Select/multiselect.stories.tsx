import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '@mui/material';
import { MultiSelect } from './MultiSelect';
import { PWMenuItem } from '../../Menu/MenuItem';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Multi Select Dropdown',
    component: MultiSelect,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
    {
        value: '1',
        text: 'Dropdown Option 1',
        bold: true
    },
    {
        value: '2',
        text: 'Dropdown Option 2',
        italic: true
    },
    {
        value: '3',
        text: 'Dropdown Option 3'
    }
];

export const StandardMultiSelect: Story = {
    args: {
        value: ['1'],
        options
    }
};

export const MultipleItemsSelected: Story = {
    args: {
        value: ['1', '2', '3'],
        options
    }
};

export const SelectWithOnChangeListener: Story = {
    args: {
        value: ['1'],
        options,
        onChange: values => alert(`Selected values: ${values.join(', ')}`)
    }
};

export const DisabledSelect: Story = {
    args: {
        disabled: true,
        value: ['1'],
        options
    }
};

export const SelectWithPlaceholder: Story = {
    args: {
        placeholder: 'Select an option',
        value: ['1'],
        options
    }
};

export const SelectWithError: Story = {
    args: {
        value: ['1'],
        options,
        isError: true
    }
};

export const SelectWithHelperText: Story = {
    args: {
        value: ['1'],
        options,
        helperText: 'You can do this, I believe in you'
    }
};

export const SelectWithCustomMenuItems: Story = {
    args: {
        value: ['1'],
        options,
        renderMenuItem: option => (
            <PWMenuItem sx={{ color: 'yellow' }} key={option.value} value={option.text}>
                {option.text}
            </PWMenuItem>
        ),
        renderValue: <Typography color="yellow">Custom Render Value</Typography>
    }
};

export const SelectWithSlotStyling: Story = {
    args: {
        value: ['1'],
        options,
        helperText: 'This has some custom slot styling',
        sx: {
            select: {
                height: 24
            },
            menu: {
                PaperProps: {
                    style: {
                        backgroundColor: 'black'
                    }
                }
            },
            menuItem: {
                backgroundColor: 'gray'
            }
        }
    }
};

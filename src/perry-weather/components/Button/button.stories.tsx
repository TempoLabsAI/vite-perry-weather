import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { Typography } from '@mui/material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Button',
    component: Button,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardButton: Story = {
    args: {
        children: <Typography>Button</Typography>
    }
};

export const DisabledButton: Story = {
    args: {
        disabled: true,
        children: <Typography>Disabled Button</Typography>
    }
};

export const ClearButton: Story = {
    args: {
        type: 'clear',
        children: <Typography>Clear Button</Typography>
    }
};

export const ClearBlueButton: Story = {
    args: {
        type: 'clearBlue',
        children: <Typography>Clear Blue Button</Typography>
    }
};

export const DeleteButton: Story = {
    args: {
        type: 'delete',
        children: <Typography>Delete Button</Typography>
    }
};

export const ButtonWithSlotStyling: Story = {
    args: {
        children: <Typography>Button with Slot Styling</Typography>,
        sx: {
            base: {
                borderRadius: '2px'
            }
        }
    }
};

import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip';
import { Typography } from '@mui/material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardTooltip: Story = {
    args: {
        title: "Well hello there, I'm your friendly neighborhood tooltip",
        children: <Typography>Hover over me to see a tooltip</Typography>
    }
};

export const TooltipWithALongDescription: Story = {
    args: {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        children: <Typography>Hover to see a tooltip with a lot of text</Typography>
    }
};

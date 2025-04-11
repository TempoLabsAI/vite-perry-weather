import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';
import { Typography } from '@mui/material';
import { HighlightOff } from '@mui/icons-material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Card',
    component: Card,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = function Render(args: React.ComponentProps<typeof Card>) {
    return (
        <div style={{ width: '300px' }}>
            <Card {...args} />
        </div>
    );
};

export const StandardCard: Story = {
    args: {
        header: 'I am a Card Component title',
        children: <Typography>I&apos;m the body of the Card</Typography>
    },
    render
};

export const CardWithSubtitle: Story = {
    args: {
        header: 'Card with subtitle',
        headerSubtitle: 'I am a subtitle',
        children: <Typography>I&apos;m the body of the Card</Typography>
    },
    render
};

export const CardWithLongTitle: Story = {
    args: {
        header: 'I am a Card Component title that is very long and will wrap to the next line',
        children: <Typography>Try to avoid title wrapping if possible</Typography>
    },
    render
};

export const CardWithAction: Story = {
    args: {
        header: 'Card with action',
        children: <Typography>Actions are perfect for clickable icons</Typography>,
        action: <HighlightOff onClick={() => alert('Action!')} />
    },
    render
};

export const ScaryCard: Story = {
    args: {
        header: 'Scary Card',
        children: <Typography>This card is great for warnings / alerts</Typography>,
        scary: true
    },
    render
};

export const FullContentCard: Story = {
    args: {
        header: 'Full Content Card',
        children: (
            <Typography>A full content card removes the padding on the content so you can fill this with whatever you want, like imagery</Typography>
        ),
        fullContent: true
    },
    render
};

export const CardWithSlotStyling: Story = {
    args: {
        header: 'Slot Styled Card',
        children: (
            <Typography>
                Cards can be styled by using MUI slot styles. You can style the card itself (like the box shadow), or the content container (the green
                background)
            </Typography>
        ),
        sx: {
            card: {
                boxShadow: '0px 0px 10px 0px red'
            },
            content: {
                backgroundColor: 'lightgreen'
            }
        }
    },
    render
};

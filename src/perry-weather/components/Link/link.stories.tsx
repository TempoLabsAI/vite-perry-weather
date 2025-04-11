import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link';
import { Typography } from '@mui/material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Link',
    component: Link,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardLink: Story = {
    args: {
        href: 'https://perryweather.com',
        target: '_blank',
        children: <Typography>Click to visit PerryWeather</Typography>
    }
};

export const InactiveLink: Story = {
    args: {
        inactive: true,
        children: <Typography>Inactive Link</Typography>
    }
};

export const LinkWithOnClickCallback: Story = {
    args: {
        children: <Typography>Click to have a link be handled by React</Typography>,
        onClick: () => alert('You clicked on a link!')
    }
};

export const LinkWithAlwaysUnderline: Story = {
    args: {
        children: <Typography>This link is always underlined</Typography>,
        onClick: () => alert('You clicked on a link!'),
        underline: 'always'
    }
};

export const LinkWithCustomStyling: Story = {
    args: {
        children: <Typography>This link has custom styling</Typography>,
        onClick: () => alert('You clicked on a link!'),
        sx: { color: 'red' }
    }
};

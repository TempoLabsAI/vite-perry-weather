import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './Page';
import { Skeleton, Typography } from '@mui/material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Page',
    component: Page,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = function Render(args: React.ComponentProps<typeof Page>) {
    return (
        <div style={{ width: '600px', border: '1px solid red' }}>
            <Page {...args} />
        </div>
    );
};

export const StandardPage: Story = {
    args: {
        title: <Typography variant="h3">Page Title</Typography>,
        subheader: <Typography variant="h5">Page Subheader</Typography>,
        docTitle: 'Page Story',
        children: <Typography>I am the page children component</Typography>
    },
    render
};

export const LoadingPage: Story = {
    args: {
        title: <Typography variant="h3">Page Title</Typography>,
        docTitle: 'Page Story',
        children: <Skeleton></Skeleton>,
        loading: true
    },
    render
};

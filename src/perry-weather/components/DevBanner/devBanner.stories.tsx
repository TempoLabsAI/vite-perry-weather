import type { Meta, StoryObj } from '@storybook/react';

import { DevBanner } from './DevBanner';
import { ComponentProps } from 'react';
import { Typography, useTheme } from '@mui/material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'DevBanner',
    component: DevBanner,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof DevBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardDevBanner: Story = {
    render: function Render(args: ComponentProps<typeof DevBanner>) {
        const theme = useTheme();
        return (
            <div style={{ width: '600px', height: '300px', border: `1px solid ${theme.palette.primary.main}` }}>
                <DevBanner {...args} />
                <Typography>
                    This is a dev banner. It will sit above the screen&apos;s content fixed to the top of the screen. Or in the case of Storybook,
                    fixed to the top of the preview window. The blue border around the preview window shows the bounds of the content. Note how
                    content gets pushed down by the height of the dev banner.
                </Typography>
            </div>
        );
    },
    args: {
        environment: 'Local'
    }
};

export const DevBannerForProduction: Story = {
    render: function Render(args: ComponentProps<typeof DevBanner>) {
        const theme = useTheme();
        return (
            <div style={{ width: '600px', height: '300px', border: `1px solid ${theme.palette.primary.main}` }}>
                <DevBanner {...args} />
                <Typography>If you pass environment=production, then the banner will not display and the children will render unaffected</Typography>
            </div>
        );
    },
    args: {
        environment: 'production'
    }
};

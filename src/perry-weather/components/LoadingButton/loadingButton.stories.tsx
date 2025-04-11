import type { Meta, StoryObj } from '@storybook/react';

import { LoadingButton } from './LoadingButton';
import { Typography } from '@mui/material';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Loading Button',
    component: LoadingButton,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof LoadingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardLoadingButton: Story = {
    args: {
        isLoading: true,
        loadingText: 'Loading Button'
    }
};

export const IndefiniteLoopingLoadingButton: Story = {
    args: {
        loop: true,
        isLoading: true,
        loadingText: 'Loading Button that Loops Indefinitely'
    }
};

export const FastAnimationLoadingButton: Story = {
    args: {
        loop: true,
        duration: 1,
        isLoading: true,
        loadingText: 'Loading Button with Fast Animation'
    }
};

export const SlowAnimationLoadingButton: Story = {
    args: {
        loop: true,
        duration: 10,
        isLoading: true,
        loadingText: 'Loading Button with Slow Animation'
    }
};

export const LoadButtonNotLoading: Story = {
    args: {
        isLoading: false,
        children: <Typography>Button that is not loading</Typography>
    }
};

export const DisabledButton: Story = {
    args: {
        disabled: true,
        children: <Typography>Disabled Loading Button</Typography>
    }
};

export const LoadButtonWithFinishedLoading: Story = {
    args: {
        isLoading: false,
        duration: 3,
        children: <Typography>Click me to start loading</Typography>,
        loadingText: 'In 3 seconds I will finish loading...',
        finishedLoading: () => alert('Finished Loading')
    },
    render: function Render(args) {
        const [isLoading, setIsLoading] = useState(args.isLoading);

        const finishedLoading = () => {
            setIsLoading(false);
            args.finishedLoading?.();
        };

        return <LoadingButton {...args} onClick={() => setIsLoading(true)} isLoading={isLoading} finishedLoading={finishedLoading} />;
    }
};

export const LoadingButtonWithSlotStyling: Story = {
    args: {
        loop: true,
        duration: 10,
        isLoading: true,
        loadingText: 'Loading Button with Slot Styling',
        sx: {
            button: {
                height: '24px'
            },
            loadingAnimation: {
                background: 'linear-gradient(270deg, red 0%, white 90.3%)'
            }
        }
    }
};

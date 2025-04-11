import type { Meta, StoryObj } from '@storybook/react';

import { Toast } from './Toast';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Toast',
    component: Toast,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = function Render(args: React.ComponentProps<typeof Toast>) {
    const [show, setShow] = useState(args.show);
    return (
        <div style={{ width: '600px', height: '150px' }}>
            <Toast {...args} show={show} onClose={() => setShow(false)} />
        </div>
    );
};

export const StandardToast: Story = {
    args: {
        variant: 'success',
        header: 'This is a Toast Component.',
        message: 'Render near the root of the DOM so notifications appear in the corner',
        show: true,
        disableAutoHide: true
    },
    render
};

export const SuccessToast: Story = {
    args: {
        variant: 'success',
        header: 'Successfully saved profile',
        show: true,
        disableAutoHide: true
    },
    render
};

export const ToastWithCustomDismissDelay: Story = {
    args: {
        variant: 'success',
        header: 'This will dismiss in 10 seconds',
        message: 'The default is 3 seconds',
        show: true,
        autoHideDuration: 10000
    },
    render
};

export const InfoToast: Story = {
    args: {
        variant: 'info',
        header: 'Here is some info',
        show: true,
        disableAutoHide: true
    },
    render
};

export const WarningToast: Story = {
    args: {
        variant: 'warn',
        header: 'Here is a warning',
        show: true,
        disableAutoHide: true
    },
    render
};

export const ErrorToast: Story = {
    args: {
        variant: 'error',
        header: 'Error saving your profile',
        show: true,
        disableAutoHide: true
    },
    render
};

export const ToastWithMessage: Story = {
    args: {
        variant: 'error',
        header: 'Error saving your profile',
        message: 'Please try again later',
        show: true,
        disableAutoHide: true
    },
    render
};

export const ToastWithSlotStyling: Story = {
    args: {
        variant: 'error',
        header: 'You can style the toast with the sx prop',
        message: 'Including the Snackbar (box-shadow) and the Bread (background-color)',
        show: true,
        disableAutoHide: true,
        sx: {
            snackbar: {
                '&.MuiSnackbar-root': {
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)'
                }
            },
            bread: {
                paper: {
                    backgroundColor: 'white'
                }
            }
        }
    },
    render
};

import type { Meta, StoryObj } from '@storybook/react';

import { Bread } from './Bread';
import { Warning } from '@mui/icons-material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Bread',
    component: Bread,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Bread>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardBread: Story = {
    args: {
        variant: 'success',
        header: 'This is a Bread Component. It can be used to display static messages to the user.'
    }
};

export const BreadWithWrapping: Story = {
    render: args => <Bread {...args} sx={{ paper: { width: '200px' } }} />,
    args: {
        variant: 'success',
        header: 'You can control the width of the bread by passing in an sx prop, and it will wrap the text as expected.'
    }
};

export const InfoBread: Story = {
    args: {
        variant: 'info',
        header: 'This is an Info Bread Component'
    }
};

export const WarningBread: Story = {
    args: {
        variant: 'warn',
        header: 'This is a Warning Bread Component'
    }
};

export const ErrorBread: Story = {
    args: {
        variant: 'error',
        header: 'This is an Error Bread Component'
    }
};

export const BreadWithMessage: Story = {
    args: {
        variant: 'success',
        header: 'This is a Success Bread Component',
        message: 'You can also add more description in the message prop'
    }
};

export const BreadWithIcon: Story = {
    args: {
        variant: 'success',
        header: 'Bread with icon',
        icon: <Warning />
    }
};

export const CloseableBread: Story = {
    args: {
        variant: 'success',
        header: 'Closeable Bread',
        closeable: true,
        onClose: () => alert('Close!')
    }
};

export const BreadWithSlotStyling: Story = {
    args: {
        variant: 'error',
        header: 'You can style the bread with the sx prop',
        sx: {
            paper: {
                backgroundColor: 'white'
            }
        }
    }
};

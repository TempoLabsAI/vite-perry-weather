import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardCheckbox: Story = {
    args: {
        label: 'Checkbox Component'
    }
};

export const CheckedCheckbox: Story = {
    args: {
        checked: true
    }
};

export const DisabledCheckbox: Story = {
    args: {
        disabled: true
    }
};

export const LabeledCheckbox: Story = {
    args: {
        label: 'Checkbox Label'
    }
};

export const CheckboxWithSlotStyling: Story = {
    args: {
        label: 'This checkbox has slot styling',
        checked: true,
        sx: {
            checkbox: {
                color: 'green',
                '&.Mui-checked': {
                    color: 'green'
                }
            }
        }
    }
};

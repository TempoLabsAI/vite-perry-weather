import type { Meta, StoryObj } from '@storybook/react';

import { Radio } from './Radio';
import { RadioGroup } from '@mui/material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Radio',
    component: Radio,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardRadio: Story = {
    args: {
        value: 'radio',
        label: 'Radio Component',
        onChange: (e, checked) => alert(checked ? 'Radio was checked' : 'Radio was unchecked')
    }
};

export const CheckedRadio: Story = {
    args: {
        value: 'radio',
        label: 'Checked Radio Component',
        checked: true
    }
};

export const SmallRadio: Story = {
    args: {
        value: 'radio',
        label: 'Small Radio Component',
        size: 'small'
    }
};

export const MediumRadio: Story = {
    args: {
        value: 'radio',
        label: 'Medium Radio Component',
        size: 'medium'
    }
};

export const UsageWithinARadioGroup: Story = {
    args: {
        value: 'radio',
        size: 'medium'
    },
    render: args => (
        <RadioGroup name="radioGroup" defaultValue="radio1" onChange={(e, value) => alert(`Selected value: ${value}`)}>
            <Radio {...args} value="radio1" label="Option 1" />
            <Radio {...args} value="radio2" label="Option 2" />
            <Radio {...args} value="radio3" label="Option 3" />
        </RadioGroup>
    )
};

export const RadioWithSlotStyling: Story = {
    args: {
        value: 'radio',
        label: 'This radio has slot styling applied to it',
        checked: true,
        sx: {
            radio: {
                color: 'green',
                '&.Mui-checked': {
                    color: 'green'
                }
            }
        }
    }
};

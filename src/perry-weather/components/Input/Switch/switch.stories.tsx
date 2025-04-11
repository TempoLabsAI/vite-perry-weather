import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from './Switch';
import { ComponentProps, useEffect, useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Switch (Toggle)',
    component: Switch,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const onChange: ComponentProps<typeof Switch>['onChange'] = (e, checked) => alert('Switch is being ' + (checked ? 'enabled' : 'disabled'));

export const StandardSwitch: Story = {
    args: {
        onChange
    },
    render: function RenderSwitch(args) {
        const [checked, setChecked] = useState(args.checked);
        const onToggle = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
            setChecked(checked);
        };

        useEffect(() => {
            setChecked(args.checked);
        }, [args.checked]);

        return <Switch {...args} onChange={onToggle} checked={checked} />;
    }
};

export const EnabledSwitch: Story = {
    args: {
        checked: true,
        onChange
    }
};

export const SwitchWithLabel: Story = {
    args: {
        label: 'Switch with label',
        onChange
    }
};

export const SwitchWithSlotStyles: Story = {
    args: {
        label: 'Switch with Slot Styles',
        onChange,
        sx: {
            switch: {
                borderRadius: 0,
                '& .MuiSwitch-track': {
                    borderRadius: 0
                }
            }
        }
    }
};

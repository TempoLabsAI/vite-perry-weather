import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './Slider';
import { ComponentProps } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Slider',
    component: Slider,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;
type SliderProps = ComponentProps<typeof Slider>;

const render = (args: SliderProps) => (
    <div style={{ width: '300px' }}>
        <Slider {...args} />
    </div>
);

export const StandardSlider: Story = {
    render,
    args: {
        min: 0,
        max: 20,
        value: 5
    }
};

export const SliderWithCustomBackgroundColor: Story = {
    render,
    args: {
        min: 0,
        max: 20,
        value: 5,
        backgroundColor: 'red'
    }
};

export const SliderWithCustomStep: Story = {
    render,
    args: {
        min: 0,
        max: 30,
        value: 15,
        step: 3,
        displayValue: true
    }
};

export const DisabledSlider: Story = {
    render,
    args: {
        min: 0,
        max: 20,
        value: 5,
        disabled: true
    }
};

export const SliderWithSoftMinAndMax: Story = {
    render,
    args: {
        min: 0,
        max: 20,
        value: 10,
        softMin: 5,
        softMax: 15
    }
};

export const SliderWithDisplayValue: Story = {
    render,
    args: {
        min: 0,
        max: 20,
        value: 10,
        displayValue: true
    }
};

export const SliderWithDisplayValueSize: Story = {
    render,
    args: {
        min: 0,
        max: 20,
        value: 10,
        displayValue: true,
        displayValueSize: 1
    }
};

export const SliderWithUnit: Story = {
    render,
    args: {
        min: 0,
        max: 20,
        value: 10,
        displayValue: true,
        unit: '°C'
    }
};

export const SliderWithCustomDisplayValue: Story = {
    render,
    args: {
        min: 0,
        max: 20,
        value: 10,
        customDisplay: 'Slider'
    }
};

export const SliderWithOnChange: Story = {
    render,
    args: {
        min: 0,
        max: 20,
        value: 10,
        onChange: (value: number) => alert(`Value changed to ${value}. This will trigger on EVERY change, even while holding the mouse down`)
    }
};

export const SliderWithOnChangeCommit: Story = {
    render,
    args: {
        min: 0,
        max: 20,
        value: 10,
        onChangeCommit: (value: number) => alert('Value changed to ' + value)
    }
};

export const SliderWithSlotStyling: Story = {
    render,
    args: {
        min: 0,
        max: 20,
        value: 10,
        customDisplay: 'Custom Styling',
        sx: {
            slider: {
                '& .MuiSlider-track': {
                    borderRadius: 0
                }
            }
        }
    }
};

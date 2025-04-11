import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardTextArea: Story = {
    args: {}
};

export const TextAreaWithValue: Story = {
    args: {
        value: 'This is a text area'
    }
};

export const TextAreaWithHelperText: Story = {
    args: {
        helperText: 'This is a text area with helper text'
    }
};

export const TextAreaWithError: Story = {
    args: {
        isError: true,
        value: 'There is an error here somewhere'
    }
};

export const TextAreaWithPlaceholder: Story = {
    args: {
        placeholder: 'Enter some text here'
    }
};

export const DisabledTextArea: Story = {
    args: {
        disabled: true,
        value: 'This text area is disabled'
    }
};

export const ResizeableTextArea: Story = {
    args: {
        resize: true,
        value: 'This text area can be resized'
    }
};

export const ReadonlyTextArea: Story = {
    args: {
        readonly: true,
        sx: { width: '300px' },
        placeholder: 'This text area looks editable, but is actually read-only, which allows for scrolling'
    }
};

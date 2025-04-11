import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './TextField';
import { ErrorOutline } from '@mui/icons-material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'TextField',
    component: TextField,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardTextField: Story = {
    args: {}
};

export const TextFieldWithValue: Story = {
    args: {
        value: 'This field has a value'
    }
};

export const TextFieldWithHelperText: Story = {
    args: {
        helperText: 'This is a text field with helper text'
    }
};

export const TextFieldWithError: Story = {
    args: {
        isError: true,
        value: 'There is an error here'
    }
};

export const TextFieldWithPlaceholder: Story = {
    args: {
        placeholder: 'Enter some text here'
    }
};

export const DisabledTextField: Story = {
    args: {
        disabled: true,
        value: 'This text field is disabled'
    }
};

export const PasswordTextField: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter your password'
    }
};

export const NumericTextField: Story = {
    args: {
        type: 'number',
        placeholder: 'Enter some numbers'
    }
};

export const TextFieldWithEndAdornment: Story = {
    args: {
        value: 'Warning!',
        endAdornment: <ErrorOutline />
    }
};

export const TextFieldWithCustomInputMode: Story = {
    args: {
        placeholder: 'Input mode = email',
        inputMode: 'email'
    }
};

export const TextFieldWithAutoComplete: Story = {
    args: {
        placeholder: 'Auto complete on',
        autoComplete: 'on'
    }
};

export const ReadOnlyTextField: Story = {
    args: {
        placeholder: 'This field is read only',
        readonly: true
    }
};

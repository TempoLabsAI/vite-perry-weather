import type { Meta, StoryObj } from '@storybook/react';

import { SearchField } from './SearchField';
import { ErrorOutline } from '@mui/icons-material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'SearchField',
    component: SearchField,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleSearch = () => {};

export const StandardSearchField: Story = {
    args: {
        handleSearch
    }
};

export const SearchWithHandleSearchCallback: Story = {
    args: {
        handleSearch: (searchValue: string) => alert(`Searching for: ${searchValue}`)
    }
};

export const SearchWithCustomDebounce: Story = {
    args: {
        handleSearch: (searchValue: string) => alert(`Searching for: ${searchValue} after 2 seconds`),
        debounce: 2000
    }
};

export const DisabledSearchField: Story = {
    args: {
        disabled: true,
        handleSearch
    }
};

export const SearchWithPlaceholder: Story = {
    args: {
        placeholder: 'Search for something',
        handleSearch
    }
};

export const SearchWithAdditionalEndAdornment: Story = {
    args: {
        additionalEndAdornment: <ErrorOutline />,
        handleSearch
    }
};

export const SearchFieldWithSlotStyling: Story = {
    args: {
        handleSearch,
        placeholder: 'I have custom styling',
        sx: {
            searchField: {
                '& .MuiOutlinedInput-root': {
                    height: '24px'
                }
            }
        }
    }
};

import type { Meta, StoryObj } from '@storybook/react';

import { Pill } from './Pill';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { ArrowDropDown, Check, Star } from '@mui/icons-material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Pill',
    component: Pill,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = function Render(args: React.ComponentProps<typeof Pill>) {
    const [selected, setSelected] = useState(args.selected);
    return <Pill {...args} selected={selected} onClick={() => setSelected(!selected)} />;
};

export const StandardPill: Story = {
    render,
    args: {
        label: <Typography>I am a clickable Pill</Typography>,
        selected: false,
        selectedIcon: <Check />,
        clickable: true
    }
};

export const SelectedPill: Story = {
    render,
    args: {
        label: <Typography>I am a selected Pill</Typography>,
        selected: true,
        selectedIcon: <Check />,
        clickable: true
    }
};

export const UnclickablePill: Story = {
    args: {
        label: <Typography>I can also be unclickable</Typography>
    }
};

export const PillWithDifferentAvatar: Story = {
    render,
    args: {
        label: <Typography>I have a different avatar prop</Typography>,
        avatar: <Star />,
        clickable: true
    }
};

export const PillWithAvatarAndSelectedIcon: Story = {
    render,
    args: {
        label: <Typography>Combine an Avatar with a SelectedIcon to have the icon change on selection</Typography>,
        avatar: <Star />,
        selectedIcon: <Check />,
        clickable: true
    }
};

export const PillWithDeleteAction: Story = {
    render,
    args: {
        label: <Typography>I can also have a right (delete) action icon, just be sure to include an onDelete callback</Typography>,
        deleteIcon: <ArrowDropDown />,
        onDelete: () => alert('Perform an action')
    }
};

export const PillWithSlotStyles: Story = {
    render,
    args: {
        label: <Typography>I have a custom slot styles</Typography>,
        avatar: <Star />,
        clickable: true,
        sx: {
            chip: {
                '&.MuiChip-root': {
                    backgroundColor: 'gray'
                }
            },
            selected: {
                '&.MuiChip-root': {
                    backgroundColor: 'green'
                }
            }
        }
    }
};

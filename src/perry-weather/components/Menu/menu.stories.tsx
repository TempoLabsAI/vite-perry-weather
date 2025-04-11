import type { Meta, StoryObj } from '@storybook/react';

import { Menu } from './Menu';
import { PWMenuItem } from './MenuItem';
import { ComponentProps, useState } from 'react';
import { Typography } from '@mui/material';
import Button from '../Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Menu & Menu Item',
    component: Menu,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleClose = () => {
    alert('Menu Item Clicked');
};

const children = [
    <PWMenuItem key={1} onClick={handleClose}>
        Menu Item 1
    </PWMenuItem>,
    <PWMenuItem key={2} onClick={handleClose}>
        Menu Item 2
    </PWMenuItem>,
    <PWMenuItem key={3} onClick={handleClose}>
        Menu Item 3
    </PWMenuItem>,
    <PWMenuItem key={4} onClick={handleClose}>
        Menu Item that is a bit longer
    </PWMenuItem>
];

const CloseableMenuComponent = (args: ComponentProps<typeof Menu>) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Button onClick={() => setOpen(!open)}>
                <Typography>Toggle Menu</Typography>
            </Button>
            <Menu {...args} open={open} onClose={() => setOpen(false)}>
                {children}
            </Menu>
        </div>
    );
};

export const CloseableMenu: Story = {
    args: {
        children,
        onClose: handleClose,
        anchorEl: () => document.getElementsByClassName('docs-story')[0],
        open: false
    },
    render: args => <CloseableMenuComponent {...args} />
};

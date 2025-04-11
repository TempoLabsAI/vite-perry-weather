import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './Modal';
import { Typography } from '@mui/material';
import { ComponentProps, useState } from 'react';
import Button from '../Button/Button';
import { IosShare } from '@mui/icons-material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Modal',
    component: Modal,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = function Render(args: ComponentProps<typeof Modal>, showButton: boolean = false) {
    const [open, setOpen] = useState(args.modalState.open);

    const modalState = {
        open,
        handleOpen: () => setOpen(true),
        handleClose: () => setOpen(false)
    };

    return (
        <div>
            {showButton && <Button onClick={() => setOpen(true)}>Click to Open this Modal</Button>}
            <Modal {...args} modalState={modalState} />
        </div>
    );
};

const modalState = {
    open: false,
    handleOpen: () => {},
    handleClose: () => {}
};

export const StandardModal: Story = {
    args: {
        children: <Typography>I&apos;m a basic modal</Typography>,
        modalState
    },
    render: args => render(args, true)
};

export const ModalWithIconAsAnOpener: Story = {
    args: {
        children: <Typography>I&apos;m a modal that uses an icon to open</Typography>,
        modalIcon: <IosShare />,
        modalState
    },
    render: args => render(args, false)
};

export const ModalWithTextAsAnOpener: Story = {
    args: {
        children: <Typography>I&apos;m a modal that uses some text to open</Typography>,
        modalText: 'Click me to open a Modal',
        modalState
    },
    render: args => render(args, false)
};

export const ModalWithTooltipAsOpener: Story = {
    args: {
        children: <Typography>I&apos;m a modal that uses some text with a tooltip to open</Typography>,
        modalText: 'Hover to see a tooltip, and click to open a modal',
        tooltip: {
            title: 'I can provide helpful context for what the user can expect'
        },
        modalState
    },
    render: args => render(args, false)
};

export const ModalWithObjectAsOpener: Story = {
    args: {
        children: <Typography>I&apos;m a modal that uses some text to open</Typography>,
        modalObject: <Typography color="yellow">I can be any component you want! Click me!</Typography>,
        modalState
    },
    render: args => render(args, false)
};

export const DisabledModal: Story = {
    args: {
        children: <Typography>I&apos;m a modal that uses some text to open</Typography>,
        modalIcon: <IosShare />,
        tooltip: {
            title: "I am disabled, so I won't do anything if you click on the icon"
        },
        disabled: true,
        modalState
    },
    render: args => render(args, false)
};

export const ModalWithCustomStyles: Story = {
    args: {
        children: <Typography>I&apos;m a modal with custom styles, like background and 80% width</Typography>,
        modalText: 'Click me to open a Modal',
        sx: {
            paper: {
                backgroundColor: 'rgba(0, 100, 0, 1.0)',
                width: '80%'
            },
            modal: {
                backgroundColor: 'rgba(0, 0, 255, 0.5)'
            }
        },
        modalState
    },
    render: args => render(args, false)
};

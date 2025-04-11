import type { Meta, StoryObj } from '@storybook/react';

import { ProfileMenu } from './ProfileMenu';
import { PWMenuItem } from '../Menu/MenuItem';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'ProfileMenu',
    component: ProfileMenu,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof ProfileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardProfileMenu: Story = {
    args: {
        name: 'Perry Weather',
        initials: 'PW',
        onLogout: () => alert('Handle your logout event!')
    }
};

export const ProfileMenuWithAdditionalMenuItems: Story = {
    args: {
        name: 'Perry Weather',
        initials: 'PW',
        onLogout: () => alert('Handle your logout event!'),
        children: ({ onClose }) => (
            <>
                <PWMenuItem
                    onClick={() => {
                        alert('Handler for profile');
                        onClose();
                    }}>
                    Profile Settings
                </PWMenuItem>
                <PWMenuItem
                    onClick={() => {
                        alert('Handler for Notifications');
                        onClose();
                    }}>
                    Notification Settings
                </PWMenuItem>
            </>
        )
    }
};

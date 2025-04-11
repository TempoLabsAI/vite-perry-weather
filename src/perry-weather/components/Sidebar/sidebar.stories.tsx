import type { Meta, StoryObj } from '@storybook/react';

import { Sidebar, SidebarTooltip, SidebarListItem } from './Sidebar';
import { List, ListItemIcon, useTheme } from '@mui/material';
import { PWLogo } from '../../iconography/PWLogo';
import { ExtensionOutlined, Home, MessageOutlined } from '@mui/icons-material';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseSidebarChildren = () => {
    const theme = useTheme();

    return (
        <List>
            <SidebarListItem>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <PWLogo color={theme.palette.background.default} />
                </div>
            </SidebarListItem>
            <SidebarListItem>
                <ListItemIcon>
                    <SidebarTooltip title="Home">
                        <div className="svg-container">
                            <Home />
                        </div>
                    </SidebarTooltip>
                </ListItemIcon>
            </SidebarListItem>
        </List>
    );
};

const render = (props: React.ComponentProps<typeof Sidebar>) => {
    return (
        <div style={{ width: '600px', height: '400px' }}>
            <Sidebar {...props} />
        </div>
    );
};

export const StandardSidebar: Story = {
    render,
    args: {
        mobileOpen: false,
        children: <BaseSidebarChildren />
    }
};

const SidebarWithMoreChildren = () => {
    const theme = useTheme();

    return (
        <List>
            <SidebarListItem>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <PWLogo color={theme.palette.background.default} />
                </div>
            </SidebarListItem>
            <SidebarListItem>
                <ListItemIcon>
                    <SidebarTooltip title="Home">
                        <div className="svg-container">
                            <Home />
                        </div>
                    </SidebarTooltip>
                </ListItemIcon>
            </SidebarListItem>
            <SidebarListItem>
                <ListItemIcon>
                    <SidebarTooltip title="Ask a Meteorologist">
                        <div className="svg-container">
                            <MessageOutlined />
                        </div>
                    </SidebarTooltip>
                </ListItemIcon>
            </SidebarListItem>
            <SidebarListItem>
                <ListItemIcon>
                    <SidebarTooltip title="Integrations">
                        <div className="svg-container">
                            <ExtensionOutlined />
                        </div>
                    </SidebarTooltip>
                </ListItemIcon>
            </SidebarListItem>
        </List>
    );
};
export const SidebarWithMoreElements: Story = {
    render,
    args: {
        mobileOpen: false,
        children: <SidebarWithMoreChildren />
    }
};

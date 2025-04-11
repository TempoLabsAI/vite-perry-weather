import type { Meta, StoryObj } from '@storybook/react';

import { DateTimeRangeSelector } from './DateTimeRangeSelector';
import moment from 'moment';

const meta = {
    title: 'Date Time Range Selector',
    component: DateTimeRangeSelector,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof DateTimeRangeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const render = function Render(args: React.ComponentProps<typeof DateTimeRangeSelector>) {
    return (
        <div style={{ width: 'fit-content', height: '400px', overflow: 'auto' }}>
            <DateTimeRangeSelector {...args} />
        </div>
    );
};

export const StandardRangeSelector: Story = {
    args: {},
    render
};

export const SelectorSetTimezone: Story = {
    args: {
        timezone: 'UTC'
    },
    render
};

export const DisabledSelector: Story = {
    args: {
        disabled: true
    },
    render
};

export const DisabledPastSelector: Story = {
    args: {
        disablePast: true
    },
    render
};

export const DisabledFutureSelector: Story = {
    args: {
        disableFuture: true
    },
    render
};

export const SelectorWithButtonSX: Story = {
    args: {
        sx: {
            button: {
                color: 'black',
                backgroundColor: 'cyan'
            }
        }
    },
    render
};

export const SelectorWithMenuSx: Story = {
    args: {
        sx: {
            menu: {
                backgroundColor: 'purple'
            }
        }
    },
    render
};

export const SelectorWithCalendarSx: Story = {
    args: {
        sx: {
            calendar: {
                backgroundColor: 'purple'
            }
        }
    },
    render
};

export const SelectorWithLeftSx: Story = {
    args: {
        sx: {
            leftSection: {
                backgroundColor: 'purple'
            }
        }
    },
    render
};

export const SelectorWithRightSx: Story = {
    args: {
        sx: {
            rightSection: {
                backgroundColor: 'purple'
            }
        }
    },
    render
};

export const RangeSelectorOnChange: Story = {
    args: {
        onChange: dateTimeRange =>
            alert(
                `
            Timezone: ${dateTimeRange.timezone}
            Date Range 
            start: ${dateTimeRange.date_range.start?.format('YYYY MM DD')}  end: ${dateTimeRange.date_range.end?.format('YYYY MM DD')}
            Time Range 
            start: ${dateTimeRange.time_range?.start?.format('h:mm:ss a')}  end: ${dateTimeRange.time_range?.end?.format('h:mm:ss a')}
            Days: ${dateTimeRange.days}
            `
            )
    },
    render
};

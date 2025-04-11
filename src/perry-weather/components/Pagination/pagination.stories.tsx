import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './Pagination';
import { useEffect, useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Pagination',
    component: Pagination,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

type PaginationProps = React.ComponentProps<typeof Pagination>;

const render = function Render(args: PaginationProps) {
    const [page, setPage] = useState(args.page);

    useEffect(() => {
        setPage(args.page);
    }, [args.page]);

    const onChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    };
    return <Pagination {...args} page={page} onChange={onChange} />;
};

export const StandardPagination: Story = {
    args: {
        count: 5,
        onChange: () => {}
    },
    render
};

export const PaginationWithPresetPage: Story = {
    args: {
        count: 5,
        page: 3,
        onChange: () => {}
    },
    render
};

export const PaginationWithSlotStyles: Story = {
    args: {
        count: 5,
        page: 3,
        onChange: () => {},
        sx: {
            pagination: {
                '& .Mui-selected': {
                    backgroundColor: 'red'
                }
            },
            nextIconButton: {
                color: 'red'
            },
            previousIconButton: {
                color: 'green'
            }
        }
    },
    render
};

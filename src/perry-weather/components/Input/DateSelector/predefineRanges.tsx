import moment, { Moment } from 'moment';

export const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const RANGES = [
    'Custom',
    'Today',
    'Yesterday',
    'This Week',
    'Last Week',
    'Last 7 days',
    'Last 15 days',
    'This Month',
    'Last Month',
    'Last 30 days',
    'Last 90 Days',
    'This Year',
    'Last Year'
];

export const getPredefinedRange = (range: string, disablePast = false, disableFuture = false): { start: Moment | null; end: Moment | null } => {
    const today = moment().startOf('day');
    const now = moment();

    let start = null;
    let end = null;

    switch (range) {
        case 'Today':
            start = today;
            end = today.endOf('day');
            break;
        case 'Yesterday':
            start = moment().subtract(1, 'days').startOf('day');
            end = moment().subtract(1, 'days').endOf('day');
            break;
        case 'This Week':
            start = moment().startOf('week');
            end = moment().endOf('week');
            break;
        case 'Last Week':
            start = moment().subtract(1, 'weeks').startOf('week');
            end = moment().subtract(1, 'weeks').endOf('week');
            break;
        case 'Last 7 days':
            start = moment().subtract(7, 'days');
            end = now;
            break;
        case 'Last 15 days':
            start = moment().subtract(15, 'days');
            end = now;
            break;
        case 'This Month':
            start = moment().startOf('month');
            end = moment().endOf('month');
            break;
        case 'Last Month':
            start = moment().subtract(1, 'months').startOf('month');
            end = moment().subtract(1, 'months').endOf('month');
            break;
        case 'Last 30 days':
            start = moment().subtract(30, 'days');
            end = now;
            break;
        case 'Last 90 Days':
            start = moment().subtract(90, 'days');
            end = now;
            break;
        case 'This Year':
            start = moment().startOf('year');
            end = moment().endOf('year');
            break;
        case 'Last Year':
            start = moment().subtract(1, 'years').startOf('year');
            end = moment().subtract(1, 'years').endOf('year');
            break;
        default:
            return { start: null, end: null };
    }

    if (disablePast) {
        start = start.isBefore(today) ? today : start;
    }

    if (disableFuture) {
        end = end.isAfter(now) ? now : end;
    }

    return { start, end };
};

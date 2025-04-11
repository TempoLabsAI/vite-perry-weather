import { SxProps, Stack, Typography, Checkbox, FormControlLabel, ToggleButton, Button, ToggleButtonGroup } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { CalendarIcon, DateCalendar, TimePicker } from '@mui/x-date-pickers';
import { Moment } from 'moment';
import { DAYS, getPredefinedRange, RANGES } from './predefineRanges';
import merge from 'lodash.merge';
interface DateTimeRangeSelectorProps {
    timezone?: string;
    disabled?: boolean;
    disablePast?: boolean;
    disableFuture?: boolean;
    sx?: {
        button?: SxProps<Theme>;
        menu?: SxProps<Theme>;
        calendar?: SxProps<Theme>;
        leftSection?: SxProps<Theme>;
        rightSection?: SxProps<Theme>;
    };
    onChange?: (dateTimeRange: DateTimeRange) => void;
}

type DateTimeRange = {
    timezone: string;
    date_range: {
        start: Moment | null;
        end: Moment | null;
    };
    time_range?: {
        start: Moment | null;
        end: Moment | null;
    };
    days?: string[];
};

const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
    openButton: {
        border: '1px solid',
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.border.main,
        color: theme.palette.text.primary,
        textTransform: 'none',
        ':hover': {
            backgroundColor: theme.palette.background.paper
        }
    },
    menuContainer: {
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        top: '4px',
        flexDirection: 'row',
        maxHeight: 334,
        overflow: 'hidden',
        border: '1px solid',
        borderRadius: 1,
        borderColor: theme.palette.border.main
    },
    leftSection: {
        padding: 2,
        width: 150,
        overflowY: 'scroll'
    },
    clearButton: {
        padding: '0',
        textTransform: 'none',
        justifyContent: 'end',
        borderRadius: 1,
        color: theme.palette.text.primary
    },
    daysTimeHeader: {
        flexDirection: 'row',
        margin: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 14,
        opacity: '50%'
    },
    rangesButtonGroup: {
        border: 0,
        borderRadius: 0
    },
    toggleDefinedRange: {
        border: 0,
        padding: '6px',
        textAlign: 'left',
        justifyContent: 'start',
        textTransform: 'none',
        color: theme.palette.text.primary,
        ':hover': {
            borderRadius: 1
        },
        '&.Mui-selected, &.Mui-selected:hover': {
            borderRadius: 1,
            color: theme.palette.text.dark,
            backgroundColor: theme.palette.action.selected
        }
    },
    toggleDayButton: {
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        padding: 0,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.primary,
        '&.Mui-selected, &.Mui-selected:hover': {
            color: theme.palette.text.dark,
            backgroundColor: theme.palette.action.selected
        }
    },
    timePickerContainer: {
        width: '70%',
        marginBottom: 2,
        gap: 1
    },
    weekDaysContainer: {
        flexDirection: 'row',
        gap: 0.5,
        marginTop: 0.5
    },
    calendar: {
        borderRight: 1,
        borderLeft: 1,
        borderColor: theme.palette.border.main,
        button: {
            borderRadius: 1
        },
        svg: {
            color: theme.palette.text.primary
        }
    }
});

export const DateTimeRangeSelector = function DateTimeRangeSelector(props: DateTimeRangeSelectorProps) {
    const { timezone = 'system', disabled, disablePast, disableFuture, onChange, sx } = props;
    const theme = useTheme();
    const styles = useStyles(theme);

    const [selectedDateRange, setSelectedDateRange] = useState<{ start: Moment | null; end: Moment | null }>({ start: null, end: null });
    const [selectedTimeRange, setSelectedTimeRange] = useState<{ start: Moment | null; end: Moment | null }>({ start: null, end: null });
    const [selectedWeekDays, setSelectedWeekDays] = useState([true, true, true, true, true, true, true]);
    const [selectedAllDay, setSelectedAllDay] = useState(true);
    const [selectedDefinedRange, setSelectedDefinedRange] = useState('Custom');

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const timeInputRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && !timeInputRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDateChange = (newDateRange: { start: Moment | null; end: Moment | null }) => {
        setSelectedDefinedRange('Custom');
        setSelectedDateRange(newDateRange);
        triggerChange({ date_range: newDateRange });
    };

    const handleTimeChange = (newTimeRange: { start: Moment | null; end: Moment | null }) => {
        if (newTimeRange.start && newTimeRange.end) {
            if (newTimeRange.start.isAfter(newTimeRange.end)) {
                newTimeRange.start = newTimeRange.end;
            }
        }

        setSelectedTimeRange(newTimeRange);
        triggerChange({ time_range: newTimeRange });
    };

    const handleDaysChange = (toggleIndex: number) => {
        setSelectedWeekDays(prevState => {
            const updatedWeekDays = [...prevState];
            updatedWeekDays[toggleIndex] = !updatedWeekDays[toggleIndex];
            triggerChange({ days: updatedWeekDays });
            return updatedWeekDays;
        });
    };

    const handleDefinedRangeChange = (predefineRange: string) => {
        setSelectedDefinedRange(predefineRange);

        const { start, end } = getPredefinedRange(predefineRange, disablePast, disableFuture);
        setSelectedDateRange({ start, end });
        triggerChange({ date_range: { start, end } });
    };

    const handleClear = () => {
        const timeReset = { start: null, end: null };
        const daysReset = Array(selectedWeekDays.length).fill(true);

        setSelectedTimeRange(timeReset);
        setSelectedWeekDays(daysReset);
        triggerChange({ time_range: timeReset, days: daysReset });
    };

    const triggerChange = ({
        date_range,
        time_range,
        days
    }: {
        date_range?: { start: Moment | null; end: Moment | null };
        time_range?: { start: Moment | null; end: Moment | null };
        days?: boolean[];
    }) => {
        if (!onChange) return;

        const newDateTimeRange = {
            timezone: timezone || '',
            date_range: selectedDateRange,
            time_range: !selectedAllDay ? selectedTimeRange : undefined,
            days: DAYS.filter((_, index) => selectedWeekDays[index])
        };

        if (timezone) newDateTimeRange.timezone = timezone;
        if (date_range) newDateTimeRange.date_range = date_range;
        if (time_range && !selectedAllDay) newDateTimeRange.time_range = time_range;
        if (days) newDateTimeRange.days = DAYS.filter((_, index) => days[index]);

        onChange(newDateTimeRange);
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<CalendarIcon />}
                onClick={() => setIsOpen(!isOpen)}
                sx={merge(styles.openButton, sx?.button)}
                disabled={disabled}>
                {selectedDateRange.start ? selectedDateRange.start?.format('Do MMMM') : 'Select date range'}{' '}
                {selectedDateRange.end ? '- ' + selectedDateRange.end?.format('Do MMMM') : ''}
            </Button>
            {isOpen && (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Stack sx={merge(styles.menuContainer, sx?.menu)} ref={menuRef}>
                        <Stack sx={merge(styles.leftSection, sx?.leftSection)}>
                            <ToggleButtonGroup
                                orientation="vertical"
                                exclusive
                                value={selectedDefinedRange}
                                sx={styles.rangesButtonGroup}
                                onChange={(_, value) => handleDefinedRangeChange(value)}>
                                {RANGES.map((predefineRange, index) => (
                                    <ToggleButton key={index} value={predefineRange} sx={styles.toggleDefinedRange}>
                                        {predefineRange}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Stack>

                        <RangeDateCalendar
                            timezone={timezone}
                            start={selectedDateRange.start}
                            end={selectedDateRange.end}
                            onChange={handleDateChange}
                            disablePast={disablePast}
                            disableFuture={disableFuture}
                            sx={merge(styles.calendar, sx?.calendar)}
                        />

                        <Stack padding={2} sx={merge(styles.rightSection, sx?.rightSection)}>
                            <Stack sx={styles.daysTimeHeader}>
                                <Typography>Time & Days</Typography>
                                <Button variant="text" sx={styles.clearButton} onClick={handleClear}>
                                    Clear
                                </Button>
                            </Stack>

                            <FormControlLabel
                                control={<Checkbox checked={selectedAllDay} onChange={() => setSelectedAllDay(!selectedAllDay)} />}
                                label="All day"
                            />

                            {!selectedAllDay && (
                                <Stack sx={styles.timePickerContainer}>
                                    <TimePicker
                                        slotProps={{
                                            popper: {
                                                ref: timeInputRef
                                            }
                                        }}
                                        timezone={timezone}
                                        label="Start"
                                        onChange={moment => handleTimeChange({ start: moment, end: selectedTimeRange.end })}
                                        value={selectedTimeRange.start}
                                    />
                                    <TimePicker
                                        slotProps={{
                                            popper: {
                                                ref: timeInputRef
                                            }
                                        }}
                                        timezone={timezone}
                                        label="End"
                                        onChange={moment => handleTimeChange({ start: selectedTimeRange.start, end: moment })}
                                        value={selectedTimeRange.end}
                                    />
                                </Stack>
                            )}

                            <Typography>Days</Typography>
                            <Stack sx={styles.weekDaysContainer}>
                                {DAYS.map((day, index) => (
                                    <ToggleButton
                                        key={index}
                                        value={index}
                                        selected={selectedWeekDays[index]}
                                        sx={styles.toggleDayButton}
                                        onChange={() => handleDaysChange(index)}>
                                        {day}
                                    </ToggleButton>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                </LocalizationProvider>
            )}
        </>
    );
};

type RangeDateCalendarProps = {
    start: Moment | null;
    end: Moment | null;
    timezone: string;
    disablePast?: boolean;
    disableFuture?: boolean;
    sx?: SxProps<Theme>;
    onChange: (newRange: { start: Moment | null; end: Moment | null }) => void;
};

function RangeDateCalendar({ start, end, timezone, disablePast = false, disableFuture = false, sx, onChange }: RangeDateCalendarProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const handleDateChange = (newDate: Moment | null) => {
        if (!onChange) return;

        if (start && !end) {
            if (newDate && start.isAfter(newDate)) onChange({ start: newDate, end: start });
            else onChange({ start, end: newDate });
        } else {
            onChange({ start: newDate, end: null });
        }
    };

    const isInRange = (date: Moment) => {
        if (!start || !end) return false;
        return date.isSameOrAfter(start) && date.isSameOrBefore(end);
    };

    const rangeHighlightStyle = (date: Moment) => {
        if (!start || !end) return {};

        if (date.isSame(start, 'day') || date.isSame(end, 'day')) {
            return { backgroundColor: theme.palette.action.selected, color: 'white' };
        }
        if (isInRange(date)) {
            return { backgroundColor: 'gray' };
        }
        return {};
    };

    return (
        <DateCalendar
            timezone={timezone}
            disablePast={disablePast}
            disableFuture={disableFuture}
            value={start}
            // @ts-ignore
            sx={merge(styles.calendar, sx)}
            slotProps={{
                day: ownerState => ({
                    style: rangeHighlightStyle(ownerState.day),
                    selectedDay: isInRange(ownerState.day),
                    onClick: () => handleDateChange(ownerState.day)
                })
            }}
        />
    );
}

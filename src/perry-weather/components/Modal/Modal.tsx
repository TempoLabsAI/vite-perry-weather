import { Modal as MUIModal, Theme, useTheme, IconButton, Typography, Box, SxProps } from '@mui/material';
import { Tooltip } from '../Tooltip/Tooltip';
import React, { forwardRef } from 'react';
import merge from 'lodash.merge';

export interface ModalState {
    open: boolean;
    handleOpen: React.MouseEventHandler;
    handleClose: () => void;
}

export interface ModalTooltip {
    title: string;
    disableFocusListener?: boolean;
    disableTouchListener?: boolean;
    disableHoverListener?: boolean;
}

interface ModalProps {
    children: React.ReactNode;
    modalIcon?: JSX.Element;
    modalButton?: JSX.Element;
    modalText?: string;
    modalObject?: JSX.Element;
    disabled?: boolean;
    disableHover?: boolean;
    tooltip?: ModalTooltip;
    modalState: ModalState;
    sx?: {
        modal?: SxProps<Theme>;
        paper?: SxProps<Theme>;
    };
}

const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        scrollbarColor: `${theme.palette.grey[500]} transparent`,
        maxHeight: '80%',
        overflow: 'auto',
        padding: '24px 32px',
        display: 'flex',
        width: 544,
        /* Base / 800 */
        background: theme.palette.background.paper,
        /* Base / 600 */
        border: '1px solid',
        borderColor: theme.palette.border.main,
        boxSizing: 'border-box',
        boxShadow: '0px 52px 57px -5px rgba(0, 0, 0, 0.5), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
        borderRadius: '8px',
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        },
        '&:focus': {
            outline: 'none'
        }
    }
});
export const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
    const {
        modalIcon,
        modalButton,
        modalObject,
        children,
        modalState,
        modalText,
        disabled,
        disableHover,
        tooltip,
        sx = { paper: {}, modal: {} }
    } = props;

    const { paper = {}, modal = {} } = sx;
    const theme = useTheme();
    const classes = useStyles(theme);

    const handleOpen = (e: React.MouseEvent) => {
        if (modalState.handleOpen && !disabled) {
            modalState.handleOpen(e);
        }
    };

    let opener: JSX.Element = <></>;

    if (modalText)
        opener = (
            <Typography sx={{ '&:hover': { cursor: 'pointer' } }} onClick={handleOpen}>
                {modalText}
            </Typography>
        );
    else if (modalIcon)
        opener = (
            <IconButton
                disabled={disabled}
                disableFocusRipple={disableHover}
                disableTouchRipple={disableHover}
                onClick={handleOpen}
                style={{ backgroundColor: disableHover ? 'transparent' : undefined }}>
                {modalIcon}
            </IconButton>
        );
    else if (modalButton) opener = <div onClick={handleOpen}>{modalButton}</div>;
    else if (modalObject)
        opener = (
            <div onClick={handleOpen} style={{ height: '100%', width: '100%' }}>
                {modalObject}
            </div>
        );

    if (tooltip)
        opener = (
            <Tooltip {...tooltip}>
                <div>{opener}</div>
            </Tooltip>
        );

    const modalStyles = merge(classes.modal, modal);
    const paperStyles = merge(classes.paper, paper);

    return (
        <div style={modalObject ? { height: '100%', width: '100%' } : {}}>
            {opener}
            <MUIModal sx={modalStyles} open={modalState.open} onClose={() => modalState.handleClose()}>
                <Box ref={ref} sx={paperStyles}>
                    <div style={{ height: '100%', width: '100%' }}>{children}</div>
                </Box>
            </MUIModal>
        </div>
    );
});

Modal.displayName = 'Modal';

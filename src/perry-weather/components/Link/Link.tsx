import { styled, Link as MuiLink, SxProps } from '@mui/material';

interface BaseLinkProps {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler;
    inactive?: boolean;
    href?: string;
    target?: React.HTMLAttributeAnchorTarget;
    underline?: 'none' | 'hover' | 'always';
    sx?: SxProps;
}

const ActiveLink = styled(MuiLink)(({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
    /* unvisited link */
    '&:link': {
        color: theme.palette.primary.main,
        textDecoration: 'none'
    },

    /* visited link */
    '&:visited': {
        color: theme.palette.primary.main
    },

    /* mouse over link */
    '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'underline'
    }
}));

const InactiveLink = styled(ActiveLink)(({ theme }) => ({
    color: theme.palette.text.secondary,
    '&:link': {
        color: theme.palette.text.secondary,
        textDecoration: 'none'
    },

    /* visited link */
    '&:visited': {
        color: theme.palette.text.secondary
    },

    /* mouse over link */
    '&:hover': {
        color: theme.palette.text.secondary,
        textDecoration: 'underline'
    }
}));

export function Link(props: BaseLinkProps) {
    const { children, onClick, href, target, inactive = false, underline = 'hover', sx } = props;

    return inactive ? (
        <InactiveLink sx={sx} target={target} href={href} underline={underline} onClick={onClick}>
            {children}
        </InactiveLink>
    ) : (
        <ActiveLink sx={sx} href={href} target={target} underline={underline} onClick={onClick}>
            {children}
        </ActiveLink>
    );
}

export default Link;

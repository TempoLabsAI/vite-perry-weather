import { Box, Card as MuiCard, Typography, Theme, styled, BoxProps, SxProps } from '@mui/material';

interface CardProps {
    header?: string;
    headerSubtitle?: string;
    action?: React.ReactElement;
    children: React.ReactNode;
    fullContent?: boolean;
    scary?: boolean;
    sx?: {
        card?: SxProps<Theme>;
        content?: SxProps<Theme>;
    };
}

//Styled card props do not take booleans for whatever reason, convert them to strings for comparison.
interface StyledCard {
    theme?: Theme;
    scary: string;
}

/// Unable to apply gradients to border color unfortunately, so we kind of mimic ...
/// Workarounds available but a bit difficult.
const StyledMuiCard = styled(MuiCard, {
    shouldForwardProp: prop => prop !== 'scary'
})<StyledCard>(({ scary, theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: '1px solid',
    borderRadius: 8,
    borderBottomColor: theme.palette.border.main,
    boxShadow: '0px 20px 44px rgba(0, 0, 0, 0.13)',
    height: '100%',
    width: '100%',
    ...(scary === 'true' && {
        background: `linear-gradient(180deg, rgba(235, 87, 78, 0.1) 0%, rgba(0, 0, 0, 0) 100%), ${theme.palette.background.paper};`,
        borderBottomColor: theme.palette.border.main,
        borderTopColor: theme.palette.mode === 'dark' ? '#692E35' : '#FCF0EE',
        borderLeftColor: theme.palette.mode === 'dark' ? '#4F2C36' : '#F8F1EF',
        borderRightColor: theme.palette.mode === 'dark' ? '#4F2C36' : '#F8F1EF'
    }),
    ...(scary === 'false' && {
        borderColor: theme.palette.border.main
    })
}));

interface StyledBoxProps extends BoxProps {
    fullContent?: boolean;
}

const StyledContent = styled(Box, {
    shouldForwardProp: prop => prop !== 'fullContent'
})<StyledBoxProps>(({ fullContent }) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '100%',
    ...(!fullContent && {
        padding: '16px 0px',
        paddingLeft: '24px',
        paddingRight: '24px'
    }),
    ...(fullContent && {
        padding: '0px 0px'
    })
}));

export function Card(props: CardProps) {
    const { fullContent, scary = false, header, headerSubtitle, children, action, sx } = props;

    return (
        <StyledMuiCard scary={scary ? 'true' : 'false'} elevation={0} sx={sx?.card}>
            <StyledContent fullContent={fullContent} sx={sx?.content}>
                {header && (
                    <Box
                        sx={{
                            padding: `${!fullContent ? '0px 0px' : '16px 24px'} 16px`,
                            display: 'flex',
                            justifyContent: 'space-between',
                            flex: '0 1 auto'
                        }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    maxWidth: '100%'
                                }}>
                                <Typography
                                    sx={{ lineHeight: '30px', height: '100%', maxWidth: '100%' }}
                                    align="left"
                                    variant="subtitle1"
                                    color="textPrimary">
                                    {header}
                                </Typography>
                                {headerSubtitle && (
                                    <Typography
                                        sx={{
                                            lineHeight: '15px',
                                            height: '100%',
                                            maxWidth: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                        align="left"
                                        variant="subtitle2"
                                        color="textSecondary">
                                        {headerSubtitle}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        <Box alignSelf="end">{action ? action : <></>}</Box>
                    </Box>
                )}
                {children}
            </StyledContent>
        </StyledMuiCard>
    );
}
export default Card;

import { Grid, Box, Container, Skeleton, GridProps, useTheme } from '@mui/material';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import React from 'react';

interface PageProps {
    title: JSX.Element;
    docTitle?: string;
    titleContainerProps?: GridProps;
    subheader?: JSX.Element;
    children?: React.ReactNode | React.ReactNode[];
    pageAction?: React.ReactElement | React.ReactElement[];
    actionContainerProps?: GridProps;
    loading?: boolean;

    /**
     * Omits the container provided by Page
     * For example dashboard where the container is needed to be set outside to include
     * Other elements within the container.
     */
    omitContainer?: boolean;
}

export function Page(props: PageProps) {
    const theme = useTheme();
    const { title, docTitle, titleContainerProps, children, pageAction, actionContainerProps, subheader, omitContainer, loading = false } = props;
    const titleDisplay = docTitle ? docTitle + ' - Perry Weather' : 'Perry Weather';

    useDocumentTitle(titleDisplay);

    const layout = (
        <Box sx={{ mb: 12 }}>
            <Box marginTop="1px" marginBottom="16px">
                <Grid container alignItems="space-between">
                    <Grid item xs={12} sm={12} md={6} lg={5} textAlign="start" paddingBottom="8px" {...titleContainerProps}>
                        {loading ? <Skeleton variant="text" width={300} height={64} /> : title}
                        {subheader}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={7}
                        display="flex"
                        sx={{ justifyContent: 'flex-end', [theme.breakpoints.down('sm')]: { justifyContent: 'flex-start' } }}
                        {...actionContainerProps}>
                        {pageAction}
                    </Grid>
                </Grid>
            </Box>
            <Box>{children}</Box>
        </Box>
    );

    if (omitContainer) {
        return <>{layout}</>;
    } else {
        return <Container maxWidth="xl">{layout}</Container>;
    }
}

export default Page;

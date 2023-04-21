import React from 'react';
import { Box, Grid, Typography, Button } from '@material-ui/core';

export default (props) => (
    <Box py={7} bgcolor="rgb(207 0 245)" color="white" >
        <Grid container justify="center">
            <Grid item xs={10}>
                <Box display="flex" justifyContent="space-between">
                <Typography variant="h4"> open Job Listing</Typography>
                <Button  onClick = {props.openNewJobModal} variant="contained" color="primary" disableElevation>
                    Post a job
                </Button>
                </Box>
            </Grid>
        </Grid>
    </Box>
)

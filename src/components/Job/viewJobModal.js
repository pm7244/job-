import React,  { useState } from 'react';
import {
    Box,
    Grid,
    FilledInput,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    makeStyles,
    Typography,
    DialogActions,
    Button,
    IconButton,
    CircularProgress
} from '@material-ui/core';
import {Close as CloseIcon} from "@material-ui/icons";
import{format} from "date-fns";

const useStyle = makeStyles((theme) =>({
    info:{
        ' & > *' : {
            margin:"6px"
        }
    },
    skillchip : {
        fontSize:'15px',
        background: "rgb(207, 0, 245)",
        margin: theme.spacing(0.5),
        padding:theme.spacing(0.75),
        borderRadius:'5px',
        display:"inline-block",
        fontWeight:'600',
        color:"#ffff",
    },
}
))


export default (props) => {
    const classes = useStyle();
    return(
    <Dialog open = {!!Object.keys(props.job).length} fullWidth >
    <DialogTitle>
    <Box display='flex' justifyContent='space-between' alignItems='center' >
        {props.job.title} @ {props.job.companyName}
        <IconButton onClick={props.closeModal}>
            <CloseIcon />
        </IconButton>
</Box>
</DialogTitle> 
<DialogContent>
    <Box>
        <Box className = {classes.info} display='flex'>
            <Typography variant='caption'> Posted On : </Typography>
            <Typography variant='caption'> 
            {props.job.postedOn &&
             format (props.job.postedOn, 'dd/MM/yyyy h:mm')}</Typography>
        </Box>

        <Box className = {classes.info} display='flex'>
            <Typography variant='caption'> Job Type </Typography>
            <Typography variant='body2'>{props.job.type} </Typography>
        </Box>
        
        <Box className = {classes.info} display='flex'>
            <Typography variant='caption'> Job Location</Typography>
            <Typography variant='body2'> {props.job.location} </Typography>
        </Box>

        
        <Box className = {classes.info} display='flex'>
            <Typography variant='caption'> Job Description </Typography>
            <Typography variant='body2'>{props.job.Description} </Typography>
        </Box>

        <Box className = {classes.info} display='flex'>
            <Typography variant='caption'> Comapny Name  </Typography>
            <Typography variant='body2'>{props.job.companyName} </Typography>
        </Box>

        <Box className = {classes.info} display='flex'>
            <Typography variant='caption'> Comapany Website </Typography>
            <Typography variant='caption'>{props.job.companyUrl} </Typography>
        </Box>

        <Box ml={0.5} >
            <Typography variant='caption'> sKILLS</Typography>
            <Grid container alignItems='Center' left = {0} >
                {props.job.skills &&
                    props.job.skills.map((skill) => (
                    <Grid item key = {skill}  className = {classes.skillchip}>
                        {skill}
                    </Grid>
                    ))}
                </Grid>
        </Box>
    </Box>
</DialogContent>
<DialogActions>
    <Button variant ="outlined" component = 'a' href= {props.job.link} target = '_black'> Apply</Button>
</DialogActions>
</Dialog>
)};
//identifier: String cannot contain unescaped `; `\`postedOn``







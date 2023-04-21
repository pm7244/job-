import React from 'react'
import {Box,Grid, Typography,Button, makeStyles} from '@material-ui/core';
import { differenceInMinutes } from 'date-fns';



const useStyle = makeStyles(( theme) =>({
        wrapper: {
            border:'1px solid #e8e8e8',
            background:"#ffff",
            cursor:"pointer",

            "&:hover" : {
                boxShadow:"0px 5px 25px rgba(0,0,0,0.1)",
                borderleft:"10px solid #E9967A"
            },    
    },
    companyName:{
        fontSize:'13.5px',
        background: theme.palette.primary.main,
        padding:theme.spacing(0.75),
        borderRadius:'5px',
        display:"inline-block",
        fontWeight:'600',
        color:"#ffff", 
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
    bt:{
        background :"#091eee",
        color:"#ffff"

    },

}));

export default (props) => {
    const classes = useStyle()
    return(
        <Box p={2} className={classes.wrapper}>
            <Grid container  alignItems="center" >
                <Grid item xs >
                    <Typography variant = "subtitle1"> {props.title}</Typography>
                    <Typography  className={classes.companyName} variant = "subtitle1">
                        {props.companyName}
                        </Typography>
                </Grid>

                <Grid item container xs>
                    {props.skills.map((skill) => (
                    <Grid key = {skill}  className = {classes.skillchip}item>
                        {skill}
                    </Grid>
                    ))}
                </Grid>

                <Grid item container direction= "column"  alignItems='flex-end'  xs > 
                <Grid item >
                <Typography variant  = "caption"  >
                 { differenceInMinutes ( Date.now(), props.postedOn)} min ago || {props.type} || {props.location}
                </Typography>
                </Grid>
                <Grid item >
                    <Box mt = {1}>
                    </Box>
                <Button onClick = {props.open}  variant = "outlined"  className={classes.bt} > 
                 Check
                  </Button>

                </Grid>       
                </Grid>
            </Grid>
        </Box>
    )
}
import React, { useState } from 'react';
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
import { Close as CloseIcon } from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
    skillchip: {
        fontSize: '15px',
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        borderRadius: '5px',
        display: "inline-block",
        fontWeight: '600',
        // border: `5px solid $ #ff000`,
        border: `1px solid`,
        cursor: "pointer",

        "&:hover": {
            backgroundColor: "#FF69B4",
            color: "#fffff"
        }
    },
    included: {
        backgroundColor: "#FF69B4",
        color: "#fffff"
    }
}));
const initState = {
    title: "",
    type: "FULL TIME",
    companyName: "",
    companyUrl: "",
    location: "Remote",
    Description: "",
    skills: [],
    link: "",
}

export default (props) => {
    const [loading, setLoading] = useState(false)
    const [jobDetails, setJobDetails] = useState(initState);

    const handleChange = (e) => {
        e.persist();
        setJobDetails((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }));
    };

    const addRemovelSkill = (skill) =>
        jobDetails.skills.includes(skill)
            ? setJobDetails((oldState) => ({
                ...oldState,
                skills: oldState.skills.filter((s) => s !== skill),
            }))
            : setJobDetails((oldState) => ({
                ...oldState,
                skills: oldState.skills.concat(skill),
            }));

    const handleSubmit = async () => {
        for(const field in jobDetails){
            if( typeof jobDetails[field]  == "string" && !jobDetails[field])  return;
        }

        if ( !jobDetails.skills.length ) return
        setLoading(true);
        await props.postJob(jobDetails);
        closeModal();
    };

    const closeModal = () => {
        setJobDetails(initState)
        setLoading(false)
        props.closeModal();

    }

    const classes = useStyle()
    const skills = [
        'JavaScript',
        'React',
        'Node.js',
        'MongoDB',
        'SQL',
        'HTML',
        'CSS',
    ];
    


    return (
        <Dialog open={props.newJobModal} fullWidth >
            <DialogTitle>
                <Box display='flex' justifyContent='space-between' alignItems='center' >
                    POST JOB
                    <IconButton onClick = {closeModal}>
                        <CloseIcon></CloseIcon>
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} >

                    <Grid item xs={6} color = "#ffff">
                        <FilledInput
                            onChange={handleChange}
                            name='title'
                            value={jobDetails.title}
                            autoComplete='off'
                            placeholder="JOB TITTLE *"
                            disableUnderline fullWidth />
                    </Grid>

                    <Grid item xs={6}>
                        <Select
                            onChange={handleChange}
                            disableUnderline
                            name='type'
                            value={jobDetails.type}
                            fullWidth
                            variant='filled'
                            defaultValue="FULL TIME"
                        >

                            <MenuItem value='FULL TIME'> FULL TIME</MenuItem>
                            <MenuItem value='PART TIME'>PART TIME</MenuItem>
                            

                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput
                        onChange = {handleChange}
                            name='companyName'
                            value={jobDetails.companyName}
                            autoComplete='off'
                            placeholder="COMPANY NAME *"
                            disableUnderline 
                            fullWidth />
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput
                         onChange = {handleChange}
                            name='companyUrl'
                            value={jobDetails.companyUrl}
                            autoComplete='off'
                            placeholder="COMPANY URL *"
                            disableUnderline fullWidth />
                    </Grid>

                    <Grid item xs={6}>
                        <Select
                            onChange={handleChange}
                            fullWidth
                            name='location'
                            value={jobDetails.location}
                            disableUnderline
                            variant='filled'
                            defaultValue="Remote"
                        >
                            <MenuItem value='Remote'> REMOTE *</MenuItem>
                            <MenuItem value='IN OFFICE'> IN OFFICE </MenuItem>
                            <MenuItem value=' WORK FROM HOME'> WORK FROM HOME </MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput
                         onChange = {handleChange}
                            name='link'
                            value={jobDetails.link}
                            autoComplete='off'
                            placeholder="job LINK *"
                            disableUnderline
                            fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <FilledInput
                         onChange = {handleChange}
                            autoComplete='off'
                            name='Description'
                            value={jobDetails.Description}
                            placeholder="JOB DESCRIPTION "
                            disableUnderline
                            fullWidth
                            multiline
                            rows={4} >
                        </FilledInput>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography>SKILLS *</Typography>
                    <Box display='flex' >
                        {skills.map((skill) => (
                            <Box
                                onClick={() => addRemovelSkill(skill)}
                                className={`${classes.skillchip} ${jobDetails.skills.includes(skill) && classes.included
                                    }`}
                                key={skill}
                            >
                                {skill}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box
                    color="red"
                    width='100%'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Typography variant='caption'> *Require fields</Typography>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disableElevation
                        color="primary"
                        disabled = {loading}
                    >
                        {loading ?(
                         <CircularProgress color = "secondary" size = {22} />
                        ) : (
                            "Post a Job"
                        )}
                     
                    </Button>
                </Box>

            </DialogActions>
        </Dialog>
    );
};


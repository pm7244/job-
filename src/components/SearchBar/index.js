import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, makeStyles, CircularProgress} from '@material-ui/core';


const useStyle = makeStyles({
    wrapper: {
        backgroundColor: "#FFF",
        display : "flex",
        boxShadow : "0px 1px 5px rgba(0, 0, 0, 0.1)",
        padding:"20px",
        borderRadius: "12px",
        "& > *" : {
            flex :1,
            height : "49px",
            mergin : "8px",
            borderRadius:"5px",
        },
    },
});

export default (props) => {
    const [loading, setLoading] = useState(false)
    const [jobSearch,setjobSearch] = useState ({
        type : "FULL TIME",
        location : "REMOTE",
    })
    const handleChange = (e) => {
        e.persist();
        setjobSearch((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }));
    };

    const search = async () => {
        setLoading(true);
        await props.fetchJobsCumtom(jobSearch);
        setLoading(false)
    };
        



    const classes = useStyle();
    return (
        <Box p={4} mt={-5} mb ={2} className={classes.wrapper}>
            <Select onChange={handleChange} value  = {jobSearch.type} name = "type" 
            disableUnderline variant='filled'  defaultValue = "FULL TIME">
                <MenuItem  value = 'FULL TIME'> FULL TIME</MenuItem>
                <MenuItem value = 'PART TIME'>PART TIME</MenuItem>
            </Select>
            <Select onChange={handleChange} value = {jobSearch.location} name = "location" 
            disableUnderline variant='filled'  defaultValue = "REMOTE">
                <MenuItem value = 'REMOTE'> REMOTE</MenuItem>
                <MenuItem value = 'IN OFFICE'> IN OFFICE </MenuItem>
                <MenuItem value = 'WORK FROM HOME'> WORK FROM HOME </MenuItem>
            </Select>
            <Button disabled = {loading}
             variant="contained" 
             color="primary" 
             disableElevation
             onClick={search}
             >
            {loading ?(
                         <CircularProgress color = "secondary" size = {22} />
                        ) : (
                            "SEARCH"
                        )}
            </Button>
        </Box>
    );
};


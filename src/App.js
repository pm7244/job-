import React, { useEffect, useState } from "react";
import { Button, ThemeProvider } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header/";
import SearchBar from "./components/SearchBar";
import { Box, CircularProgress, Grid } from "@material-ui/core";
import JobCard from "./components/Job/jobCard";
import NewJobModal from "./components/Job/newJobModal";
//import jobData from './dummyData'
import { firestore, app } from "./firebase/config";
import{Close as CloseIcon} from "@material-ui/icons"
import ViewJobModal from "./components/Job/viewJobModal";

export default () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const [newJobModal, setNewJobModal] = useState(false);
  const[viewJob,setViewJob] = useState({})

  const featchJobs = async () => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
      .collection('jobs')
      .orderBy('postedOn', 'desc')
      .get();

    const tempJobs = req.docs.map((job) => (
      {
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      }));
    setJobs(tempJobs);
    setLoading(false)
  };

  const fetchJobsCumtom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true)
    const req = await firestore
      .collection('jobs')
      .orderBy('postedOn', 'desc')
      .where("location", "==", jobSearch.location)
      .where("type", "==", jobSearch.type)
      .get();


    const tempJobs = req.docs.map((job) => (
      {
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      }));
    setJobs(tempJobs);
    setLoading(false)

  }

  const postJob = async jobDetails => {
    await firestore.collection('jobs').add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp()
    });
    featchJobs();
  };


  useEffect(() => {
    featchJobs();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Header openNewJobModal={() => setNewJobModal(true)} />
      <NewJobModal closeModal={() => setNewJobModal(false)}
        newJobModal={newJobModal}
        postJob={postJob}
      />
      <ViewJobModal job = {viewJob} closeModal= {() =>  setViewJob({})} />
      
      <Box mb={3}>

        <Grid container justify="center">
          <Grid item xs={10}>

            <SearchBar fetchJobsCumtom={fetchJobsCumtom} />
            {loading ? (
              <Box dispaly="flex" justifyContent='center'>
                <CircularProgress />
              </Box>
            ) : (
               <>
              {customSearch && (
              <Box my={2} display = 'flex' justifyContent='flex-end'>
             <Button>
                  <CloseIcon size = {20} />
                  Custom Search
                </Button>
              </Box>
              )}
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
             ))}
            </>     
        )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};




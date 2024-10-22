import React, {useEffect,useState} from "react";
import SearchForm from "./SearchForm"
import JoblyApi from "./api";
import JobCardList from "./JobCardList";

const Jobs = () => {
    const [jobs, setJobs] = useState(null);

    useEffect(function getAllJobsOnMount() {
        console.debug("JobList useEffect getAllJobsOnMount");
        search();
    }, []);

    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return <div>Loading...</div>;

    return (
        <div className="JobList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {jobs.length ? <JobCardList jobs={jobs} />
                : <p className="lead">Sorry, no results were found!</p>
            }
        </div>
  );
}

export default Jobs;
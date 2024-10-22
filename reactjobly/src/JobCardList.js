import React from "react";
import JobCard from "./JobCard";

const JobCardList =({jobs}) => {
    return(
    <>
      {jobs.map(job => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyName={job.companyName}
        />
      ))}
    </>
    )
}

export default JobCardList;
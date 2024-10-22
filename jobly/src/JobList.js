import { useState, useEffect } from "react";
import JoblyApi from "./api";
import { Navigate } from "react-router-dom";
import SearchForm from "./SearchForm";
import JobCardList from "./JobCardList";

/**
 *
 * Renders a list of all jobs in Jobly. Makes call to backend API to
 * retrieve job listing data.
 *
 * Props:
 *  - none
 *
 * State:
 * - jobs - Array - List of all jobs to display (all by default)
 * - searchFilter - string - Current search term (null by default)
 * - isLoading - boolean - Toggles the loading screen (true by default)
 *
 * RoutesList -> JobList -> { JobCardList, SearchForm }
 *
 */
function JobList() {
  const [jobs, setJobs] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Accept search term from user and query backend API for filtered list of
   * jobs.
   */
  function applyFilter(searchTerm) {
    if (!searchTerm) {
      setSearchFilter(null);
      return <Navigate to="/jobs" />;
    } else {
      if (searchTerm !== searchFilter) {
        setIsLoading(true);
        setSearchFilter((term) => (term = searchTerm));
      }
    }
  }

  useEffect(
    function fetchJobsOnMount() {
      async function fetchJobs() {
        try {
          setJobs(await JoblyApi.getJobs({ title: searchFilter }));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          <Navigate to="/" />;
        }
      }
      fetchJobs();
    },
    [searchFilter]
  );

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="JobList">
      <h2>JobList</h2>
      <SearchForm applyFilter={applyFilter} searchTerm={searchFilter} />

      <JobCardList jobs={jobs} showCompany={true} />
    </div>
  );
}

export default JobList;

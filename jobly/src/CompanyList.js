import { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";
import { Navigate } from "react-router-dom";

/**
 *
 * Renders a list of all companies in Jobly. Makes call to backend API to
 * retrieve company listing data.
 *
 * Props:
 *  - none
 *
 * State:
 * - companies - Array - List of all companies to display (all by default)
 * - searchFilter - string - Current search term (null by default)
 * - isLoading - boolean - Toggles the loading screen (true by default)
 *
 * Routes -> CompanyList -> { CompanyCard, SearchForm }
 *
 */

function CompanyList() {
  const [companies, setCompanies] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Accept search term from user and query backend API for filtered list of
   * companies.
   */
  function applyFilter(searchTerm) {
    if (!searchTerm) {
      setSearchFilter(null);
      return <Navigate to="/companies" />;
    } else {
      if (searchTerm !== searchFilter) {
        setIsLoading(true);
        setSearchFilter(searchTerm);
      }
    }
  }

  useEffect(
    function fetchCompaniesOnMount() {
      async function fetchCompanies() {
        try {
          setCompanies(await JoblyApi.getCompanies());
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          <Navigate to="/" />;
        }
      }
      fetchCompanies();
    },
    [searchFilter]
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="CompanyList">
      <h2>CompanyList</h2>
      <SearchForm applyFilter={applyFilter} searchTerm={searchFilter} />

      {companies.map(({ name, description, logoUrl, handle }) => (
        <CompanyCard
          key={handle}
          companyData={{ name, description, logoUrl, handle }}
        />
      ))}
    </div>
  );
}

export default CompanyList;

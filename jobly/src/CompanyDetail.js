import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import JobCardList from './JobCardList';
import JoblyApi from './api';

/**
 *
 * Renders a page to display all company details and jobs associated with
 * that company.
 *
 * Props:
 *  - none
*
* State:
 * - isLoading - boolean - Toggles the loading screen (true by default)
 * - companyData - Object:
 *    Example:
     {
      "company": {
        "handle": "burton-ltd",
        "name": "Burton Ltd",
        "description": "Cover couple speech bar cell measure movement finally. Nation pull inside.",
        "numEmployees": 610,
        "logoUrl": "/logos/logo4.png",
        "jobs": [
          {
            "id": 23,
            "title": "Colour technologist",
            "salary": 81000,
            "equity": "0"
          },
          {
            "id": 81,
            "title": "Health promotion specialist",
            "salary": 72000,
            "equity": "0.010"
          },
          {
            "id": 135,
            "title": "Freight forwarder",
            "salary": 183000,
            "equity": "0.093"
          }
        ]
      }
    }
 *
 * Routes -> CompanyDetail -> JobCardList
 */
function CompanyDetail() {
	const [companyData, setCompanyData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const { handle } = useParams();
	console.log('handle', handle);

	useEffect(
    function fetchCompanyOnMount() {
      async function fetchCompany() {
        try {
          setCompanyData(await JoblyApi.getCompany(handle));
        } catch (error) {
          <Navigate to='/companies' />
        }
        setIsLoading(false);
			}
			fetchCompany();
		},
		[handle]
	);

	if (isLoading) return <p>Loading...</p>;

	const { name, description, jobs } = companyData;

	return (
		<div className='CompanyDetail'>
			<h1>{name}</h1>
			<p>{description}</p>
			<JobCardList
				jobs={jobs}
				showCompany={false}
			/>
		</div>
	);
}

export default CompanyDetail;

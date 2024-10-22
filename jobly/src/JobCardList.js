import JobCard from './JobCard';

/**
 *
 * Renders a list of job cards.
 * If company name prop is passed, display cards with company name.
 *
 * Props:
 *  - jobData - Object: { title: "assistant", salary: "250,000", ... }
 *  - company(optional) - String: "Apple Inc."
 *
 * State:
 * - none
 *
 * { CompanyDetail, JobList } -> JobCardList -> JobCard
 *
 */
function JobCardList({ jobs, showCompany = false }) {
	return (
		<div className='JobCardList'>
			{jobs.map(job => (
				<JobCard
					jobData={job}
					key={job.id}
					companyName={showCompany ? job.companyName : null}
				/>
			))}
		</div>
	);
}
export default JobCardList;

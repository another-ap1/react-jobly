/**
 *
 * Renders a card to display job data.
 *
 * Props:
 *  - jobData - Object: { title: "assistant", salary: 250000, ... }
 *  - company(optional) - String: "Apple Inc."
 *
 * State:
 *  - none
 *
 * JobCardList -> JobCard
 *
 */

function JobCard ({jobData, companyName=null}) {
    const {title, salary, equity} = jobData;
    return (
      <div className="JobCard">
        <h3>{title}</h3>
        {companyName && <h4>{companyName}</h4>}
        <p>Salary: {salary}</p>
        <p>Equity: {equity}</p>
      </div>
    )
  }
  
export default JobCard;
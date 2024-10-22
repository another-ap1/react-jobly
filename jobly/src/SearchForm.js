import { useState } from "react";

/**
 *
 * Renders a search form with submit button.
 *
 * Props:
 *  - applyFilter() - function
 *  - searchTerm (optional) - string
 *
 * State:
 * - formValue - string
 *
 * { CompanyList, JobList } -> SearchForm
 *
 */
function SearchForm({ applyFilter, searchTerm=null }) {
  const [formValue, setFormValue] = useState(searchTerm);
  console.log("formval", formValue);

  /** Handle server request get a filtered list of companies based on search term. */
  function handleSearch(evt) {
    evt.preventDefault();
    const searchTerm = evt.target.searchTerm.value;
    applyFilter(searchTerm);
  }

  /** Update the formValue state when the search term field is updated. */
  function handleChange(evt) {
    setFormValue(evt.target.value);
    console.log("evt target value", evt.target.value);
  }

  return (
    <div className="SearchForm">
      <form onSubmit={handleSearch}>
        <input
          placeholder="Enter search term"
          value={formValue}
          name="searchTerm"
          onChange={handleChange}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SearchForm;

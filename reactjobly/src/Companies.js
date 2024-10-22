import React, {useState, useEffect} from "react";
import JoblyApi from "./api";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";

const Companies = () => {

    const [companies, setCompanies] = useState(null);

    useEffect(function getCompaniesOnMount() {
        console.debug("CompanyList useEffect getCompaniesOnMount");
        search();
    }, []);

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return <div>Loading...</div>;
    
    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
                {companies.length ? (
                    <div className="CompanyList-list">
                        {companies.map(c => (
                            <CompanyCard
                                key={c.handle}
                                handle={c.handle}
                                name={c.name}
                                description={c.description}
                                logoUrl={c.logoUrl}/>
                        ))}
            </div>
                ) : ( <p className="lead">Sorry, no results were found!</p> )}
            </div>
    );  
}

export default Companies;
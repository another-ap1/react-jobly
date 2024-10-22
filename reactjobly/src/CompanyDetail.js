import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import JoblyApi from "./api";
import JobCardList from './JobCardList'

const CompanyDetail = () => {

    const {handle} = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        async function getCompany(){
            setCompany(await JoblyApi.getCompany(handle));
        }
        getCompany();
    },[handle]);

    if(!company) return <div>Loading...</div>

    return (
        <>
           <h4>{company.name}</h4>
           <p>{company.description}</p>
           <JobCardList jobs={company.jobs}/> 
        </>
    )
}

export default CompanyDetail;
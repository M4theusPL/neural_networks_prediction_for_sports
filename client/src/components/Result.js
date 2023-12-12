import React, { useState, useEffect } from "react";

function Result({formData, setFormData}){

    const { discipline, country } = formData;

    const [data, setData] = useState({ discipline: "", opponent: "", result: "" });

    useEffect(() => {
            const fetchData = () => {

            const lowercaseDiscipline = discipline.toLowerCase();
            
            fetch(`discipline/${lowercaseDiscipline}/opponent/${country}`)
            .then((response) => {
                if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Received data:", data);
                setData(data);
            })
            .catch((error) => {
                console.error('Error: ', error);
                setData({
                discipline: "N/A",
                opponent: "N/A",
                result: "There is no such discipline or country in the database!",
            });
            });
        } 

        fetchData();
    }, [country, discipline]);

    return(
        <div className="components">
            <label>Discipline: {discipline}</label><br />
            <label>Country: {country}</label><br />
            <label>Result: {data.result}</label>
        </div>
    )
}

export default Result;
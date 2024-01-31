import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Basketball_Data from "../csvs/basketball_data.csv";
import Football_Data from "../csvs/football_data.csv";
import Handball_Data from "../csvs/handball_data.csv";
import Volleyball_Data from "../csvs/volleyball_data.csv";

function Country({formData, setFormData}){
    const [countries, setCountries] = useState([]);
    const { discipline } = formData;

    useEffect(() => {
        const fetchData = async () => {
          let response;

          try {
            
            if (discipline === "Football"){
                response = await fetch(Football_Data);
            }
            else if (discipline === "Basketball") {
                response = await fetch(Basketball_Data);
            } else if (discipline === "Handball") {
                response = await fetch(Handball_Data);
            } else if (discipline === "Volleyball") {
                response = await fetch(Volleyball_Data);
            } 
            
            const data = await response.text();
    
            Papa.parse(data, {
              header: true,
              dynamicTyping: true,
              complete: (result) => {
                if (result.data) {
                  const countriesFromCSV = result.data.map((row) => row.Opponent);
                  const sortedCountries = countriesFromCSV.sort();
                  setCountries(sortedCountries);
                }
              },
            });
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

    return(
        <div className="components">
            <div className="buttons">
            {countries.map((country, index) => (
                <button
                    key={index}
                    onClick={() => setFormData({ ...formData, country })}
                    className={formData.country === country ? "selected" : ""}
                >
            {country}
          </button>
        ))}
            </div>
        </div>
    )
}

export default Country;
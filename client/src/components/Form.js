import React, { useState, useEffect } from "react";
import Discipline from "./Discipline";
import Country from "./Country";
import Result from "./Result";
import '../App.css';

function Form() {

    const [ page, setPage ] = useState(0);
    const [ formData, setFormData ] = useState ({
        discipline: "",
        country: "",
    });

    const FormTitles = ["Discipline", "Country", "Result"];

    const PageDisplay = () => {
        if (page === 0) {
            return <Discipline formData={formData} setFormData={setFormData} />;
        } else if (page === 1) {
            return <Country formData={formData} setFormData={setFormData} />;
        } else {
            return <Result formData={formData} setFormData={setFormData} />;
        }
    };    

    const progressPercentage = ((page + 1) / FormTitles.length) * 100;

    return(
        <div className="form">
            <div className='progressbar'>
            <div
          style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%" }}
        ></div>

            </div>


            <div className='form-container'>
                <div className='header'>
                    <div className="form-titles">{FormTitles[page]}</div>
                </div>
                <div className='body'>
                    {PageDisplay()}
                </div>
                <div className='footer'></div>
                    <button
                        disabled = { page == 0}
                        onClick={() => 
                        {setPage((currPage) => currPage - 1)}}>
                        Back
                    </button>
                    <button 
                        disabled = { page == FormTitles.length - 1}
                        onClick={() => 
                        {setPage((currPage) => currPage + 1)}}>
                        Next
                    </button>
            </div>
        </div>
    )
}

export default Form
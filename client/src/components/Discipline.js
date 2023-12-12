import React, { useState } from "react";

function Discipline({formData, setFormData}){
    const disciplines = ["Football", "Basketball", "Handball", "Volleyball"]; 

    return(
        <div className="components">
            <div className="buttons">
                {disciplines.map((discipline, index) => (
                    <button
                        key={index}
                        onClick={() => setFormData({ ...formData, discipline })}
                        className={formData.discipline === discipline ? "selected" : ""}
                    >
                    {discipline}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Discipline;
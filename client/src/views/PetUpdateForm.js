import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router'

const PetUpdateForm = (props) =>{
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/pets/' + props.id)
        .then(res => {
            console.log(res);
            setName(res.data.pet.name);
            setType(res.data.pet.type);
            setDescription(res.data.pet.description);
            setSkill1(res.data.pet.skill1);
            setSkill2(res.data.pet.skill2);
            setSkill3(res.data.pet.skill3);
        })
        .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) =>{
        e.preventDefault();
        const updatedPet={
            name,
            type,
            description,
            skill1,
            skill2,
            skill3
        };
        axios.put('http://localhost:8000/api/pets/' + props.id, updatedPet)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err=>{
                const errorResponse = err.response.data.error.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
                console.log(errorResponse);
            });
    };

    return(
        <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
            <div>
                <h1>Pet Shelter</h1>
                <h4>Edit: {name}</h4>
                <Link to="/">Home Page</Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{display: "flex"}}>
                    <div style={{ display: "flex", flexDirection:"column", marginRight: "1em"}}>
                        <label>Pet Name</label>
                        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                        <label>Pet Type</label>
                        <input type="text" value={type} onChange={(e)=>{setType(e.target.value)}}/>
                        <label>Pet Description</label>
                        <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                    </div>
                    <div style={{ display: "flex", flexDirection:"column"}}>
                        <label>Skill 1</label>
                        <input type="text" value={skill1} onChange={(e)=>{setSkill1(e.target.value)}}/>
                        <label>Skill 2</label>
                        <input type="text" value={skill2} onChange={(e)=>{setSkill2(e.target.value)}}/>
                        <label>Skill 3</label>
                        <input type="text" value={skill3} onChange={(e)=>{setSkill3(e.target.value)}}/>
                    </div>
                </div>
                <div>
                    {errors.map((err, index) => <p key={index}>{err}</p>)}
                    <button type="submit">Edit Pet</button>
                </div>
            </form>
        </div>
    );
};

export default PetUpdateForm;
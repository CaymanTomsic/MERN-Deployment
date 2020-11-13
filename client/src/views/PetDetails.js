import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate, Link } from "@reach/router";

const PetDetails = (props) =>{
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [likes, setLikes] = useState("");
    const [likedStatus, setLikedStatus] = useState(false);

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
            setLikes(res.data.pet.likes);
        })
        .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) =>{
        axios.delete('http://localhost:8000/api/pets/' + id)
        .then(res=> {
            console.log(res);
            navigate('/');
        })
        .catch(err => console.log(err));
        // setAllPetsList(allPetsList.filter(pet => pet._id != id));
    };

    const handleLike = () =>{
        const newLikes = likes + 1;
        const newLikesObj = {
            likes: newLikes,
        };
        console.log(newLikes);
        axios.put('http://localhost:8000/api/pets/' + props.id, newLikesObj)
            .then(res=> {
                console.log(res)
                setLikes(newLikes);
                setLikedStatus(true);
            })
            .catch(err=> console.log(err));
    };

    return(
        <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
            <div>
                <h1>Pet Shelter</h1>
                <h4>Details about: {name}</h4>
                <Link to="/">Home Page</Link>
            </div>
            <button onClick={(e)=>{handleDelete(props.id)}} style={{margin: "1em"}}>Adopt {name}</button>
            <div style={{border: "black solid", width: "20%", display:"flex", flexDirection: "column", alignItems:"center", padding: "1em"}}>
                <p>Pet Type: {type}</p>
                <p>Description: {description}</p>
                <p>Skills: {skill1}, {skill2}, {skill3}</p>
                <p>Likes: {likes} </p>
                {!likedStatus && <button onClick={handleLike} style={{width: "25%"}}>Like {name}</button>}
            </div>
        </div>
    );
};

export default PetDetails;
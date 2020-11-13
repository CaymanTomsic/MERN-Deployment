import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from '@reach/router';

const PetList = (props) =>{
const [allPetsList, setAllPetsList] = useState([]);

useEffect(()=>{
    axios.get('http://localhost:8000/api/pets')
    .then(res =>{
        console.log(res.data);
        setAllPetsList(res.data);
    })
    .catch(err=> console.log(err));
}, []);

    return(
        <div>
            <div>
                <h1>Pet Shelter</h1>
                <h4>These Pets are looking for a good home</h4>
                <Link to="/pets/new"><button>Add a pet to the shelter</button></Link>
            </div>
            <div style={{display: "flex", justifyContent: "center", margin:"2em" }}>
                <table style={{borderCollapse: "collapse", border: "black solid", width: "20%"}}>
                    <tr style={{border: "black solid", }}>
                        <th>Pet</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                    {allPetsList.map((pet, index)=>{
                        return(
                        <tr style={{border: "black solid", }}>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td><Link to={`/pets/${pet._id}/edit`}><button>Edit</button></Link>
                            |
                            <Link to={`/pets/${pet._id}`}><button>Details</button></Link></td>
                        </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    );
}

export default PetList;
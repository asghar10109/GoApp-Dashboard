import nft1 from "assets/img/nfts/NftBanner1.png";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useMemo, useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import { useNavigate } from "react-router-dom";
const UpdateProperties = () => {
    const [username, setUsername] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [rent, setRent] = useState("")
    const [area, setArea] = useState("")
    const [userList, setUsers] = useState([]);
    const navigate = useNavigate()
    const token = localStorage.token;
    console.log("tokenssss", token)

    const p_id = localStorage.p_id;
    console.log("Property id i get is : ", p_id)

    const handleUsernameChange = (event) => {

        setUsername(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAreaChange = (event) => {
        setArea(event.target.value);
    };

    const handleRentChange = (event) => {
        setRent(event.target.value);
    };
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const update = () => {
        const confirmed = window.confirm('Are you sure you want to update this property?');
        if (confirmed) {
            var requestOptions = {
                method: 'POST',
                redirect: 'follow'
            };

            fetch(`https://homeapplication251.herokuapp.com/admin/api/editProperty?token=${token}&propertyId=${p_id}&username=${username}&location=${location}&images=&rent=${rent}&description=${description}&bedroom=&bathroom=&area=${area}`, requestOptions)
                .then(response => response.json())
                .then(result => setUsers(result))
                .catch(error => console.log('error', error));

        }

        if(userList.property !== null){
            window.location.href = window.location.origin + "/admin/properties";
        }
        else{
            alert(`Error: ${userList}`)
        }

    }
    // window.location.href = window.location.origin + "/admin/properties";
    // useEffect(()=>{
    //     update()
    //   },[])

    console.log("Property", userList)

    return (
        <div className="">
            <p className="mt-2 text-sm font-medium text-Black-700 dark:text-white">Welcome. and set Property </p>
            <div className="w-full">
                <InputField
                    label="Username"
                    placeholder="Username"
                    id="email"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}

                />
            </div>
            <div className="w-full">
                <InputField
                    label="Description"
                    placeholder="Description"
                    id="email"
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}

                />
            </div>
            <div className="w-full">
                <InputField
                    label="Area"
                    placeholder="Area"
                    id="email"
                    type="text"
                    value={area}
                    onChange={handleAreaChange}

                />
            </div>
            <div className="w-full">
                <InputField
                    label="Rent"
                    placeholder="Rent"
                    id="email"
                    type="text"
                    value={rent}
                    onChange={handleRentChange}

                />
            </div>
            <div className="w-full">
                <InputField
                    label="Location"
                    placeholder="Location"
                    id="email"
                    type="text"
                    value={location}
                    onChange={handleLocationChange}

                />
            </div>
            <button className="linear mt-2 w-20 rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" onClick={update}
            >
                Submit
            </button>

        </div>

    );
};

export default UpdateProperties;

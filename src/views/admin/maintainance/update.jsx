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
const UpdateMaintenance = () => {

    const navigate = useNavigate()
    const [userList, setUsers] = useState([]);
    const token = localStorage.token;
    console.log("token", token)
    const foo = () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(`https://homeapplication251.herokuapp.com/admin/api/property?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDk4NDI4YmUwYTg1ZTVkYzI5MGM3MCIsImlhdCI6MTY4MjU0MzM1OSwiZXhwIjoxNjgyNzE2MTU5fQ.IB7lS7ZanivPB_Xvrg6CrSwfpUH_EDcuHuPtR1nMtzc`, requestOptions)
            .then(response => response.json())
            .then(result => setUsers(result.properties))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        foo()
    }, [])

    const changeForm = () => {
        navigate('')
    }


    return (
        <div className="">
            <p className="mt-2 text-sm font-medium text-Black-700 dark:text-white">Welcome.and set Maintenance </p>
            <div className="w-full">
                <InputField
                    label="Username"
                    placeholder="@horizon.ui"
                    id="email"
                    type="text"

                />
            </div>
            <div className="w-full">
                <InputField
                    label="Title"
                    placeholder="@horizon.ui"
                    id="email"
                    type="text"

                />
            </div>
            <div className="w-full">
                <InputField
                    label="Description"
                    placeholder="@horizon.ui"
                    id="email"
                    type="text"

                />
            </div>
            <div className="w-full">
                <InputField
                    label="Status"
                    placeholder="@horizon.ui"
                    id="email"
                    type="text"

                />
            </div>
           
            <button className="linear mt-2 w-20 rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
                Submit
            </button>

        </div>

    );
};

export default UpdateMaintenance;

/* eslint-disable */
// import React from "react";
// import avatar from "assets/img/avatars/avatar11.png";
// import banner from "assets/img/profile/banner.png";
// import Card from "components/card";

import nft1 from "assets/img/nfts/NftBanner1.png";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useMemo, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate()
  const [userList, setUsers] = useState([]);
  
  // Use the token cookies in your code
  // const token1 = document.cookie
  // .split("; ")
  // .find(row => row.startsWith("token="))
  // .split("=")[1];

  // console.log(`Token value is ${token1}`);
  
  const token = localStorage.token;
  console.log("token", token)

  
  const foo = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`https://homeapplication251.herokuapp.com/admin/api/users?token=${token}`, requestOptions)
    .then(response => response.json())
    .then(result => setUsers(result.users))
    .catch(error => console.log('error', error));
  }
  useEffect(() => {
    foo()
  }, [])
  console.log("data 1", userList);
  
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = useMemo(() => {
    return userList.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, userList]);


  const userDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      console.log('deleted id', id);
      const requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      fetch(`https://homeapplication251.herokuapp.com/admin/api/deleteUser?token=${token}&userid=${id}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result.user))
        .catch(error => console.log('error', error));
    }
    location.reload();
  }


  return (
    <>
      <div className="flex h-10 items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
        <p className="pl-3 pr-2 text-xl">
          <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
        </p>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          class="block h-full w-full rounded-full bg-lightPrimary text-lg font-large text-black-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
        />
      </div>
      <TableContainer component={Paper} className="w-200">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Usertype</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredUsers.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                {row._id}
              </TableCell> */}
                <TableCell align="left">
                  <img
                    style={{ width: '30px', height: '30px', borderRadius: '50px', objectFit: 'cover' }}
                    src={`${row.image}`}

                  />
                </TableCell>
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.usertype}</TableCell>
                <TableCell>
                  {/* <button aria-label="" class="react-calendar__navigation__arrow bg-green-500 px-1 py-1 rounded-lg transition text-white mr-2" type="button" onClick={()=>{changeForm()}}>Edit</button> */}
                  <button aria-label="" class="react-calendar__navigation__arrow bg-green-500 px-1 py-1 rounded-lg transition text-white" type="button" onClick={() => { userDelete(row._id) }}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Banner;

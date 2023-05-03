import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FiSearch } from "react-icons/fi";
import React, { useMemo, useState, useEffect } from "react";


const DevelopmentTable = (props) => {


  const [maintainanceList, setMaintainance] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  // Use the token cookies in your code
  // const token1 = document.cookie
  // .split("; ")
  // .find(row => row.startsWith("token="))
  // .split("=")[1];

  // console.log(`Token value is ${token1}`);
  
  const token = localStorage.token;

  const maintainance = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    console.log(token);
    fetch(`https://homeapplication251.herokuapp.com/admin/api/maintenance?token=${token}`, requestOptions)
      .then(response => response.json())
      .then(result => setMaintainance(result.maintenances))
      .catch(error => console.log('error', error));
  };
  
  useEffect(() => {
    maintainance()
  }, []);
  
  const maintainanceDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this property?');
    if (confirmed) {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    fetch(`https://homeapplication251.herokuapp.com/admin/api/deleteMaintenance?token=${token}&maintenanceId=${id}`, requestOptions)
      .then(response => response.json())
      .then(result => setMaintainance(result.maintenances))
      .catch(error => console.log('error', error));
  }
  window.location.reload()
  };
  
  const changeForm = () => {
    window.location.href = window.location.origin + "/admin/property/update";
  };
  
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredMaintainance = useMemo(() => {
    return maintainanceList.filter((user) =>
      user.userid.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, maintainanceList]);
  
  
  


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
              <TableCell>ID</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Property</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMaintainance?.map((row) => (
              <TableRow
                key={row.username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="left">{row.userid.username}</TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="center">
                  <div className="rounded-lg bg-green-500 px-2 py-2 text-white transition">
                    {row.status}
                  </div>
                </TableCell>
                <TableCell>
                  {/* <button aria-label="" class="react-calendar__navigation__arrow bg-green-500 px-2 py-2 rounded-lg transition text-white mr-2" type="button" onClick={() => { changeForm() }}>Edit</button> */}
                  <button aria-label="" class="react-calendar__navigation__arrow bg-green-500 px-2 py-2 rounded-lg transition text-white" type="button" onClick={() => { maintainanceDelete(row._id) }}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DevelopmentTable;

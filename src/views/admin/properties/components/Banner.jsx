import nft1 from "assets/img/nfts/NftBanner1.png";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useMemo,useState,useEffect } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Banner1 = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()
  const [userList,setUsers] = useState([]);

  // Use the token cookies in your code
  // const token1 = document.cookie
  // .split("; ")
  // .find(row => row.startsWith("token="))
  // .split("=")[1];

  // console.log(`Token value is ${token1}`);

  const token = localStorage.token;
  console.log("token",token)
  
  const foo =()=>{
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
      fetch(`https://homeapplication251.herokuapp.com/admin/api/property?token=${token}`, requestOptions)
      .then(response => response.json())
      .then(result => setUsers(result.properties))
      .catch(error => console.log('error', error));
  }

  useEffect(()=>{
    foo()
  },[])
  console.log("data 1",userList)

  const PropertyDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this property?');
    if (confirmed) {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
      fetch(`https://homeapplication251.herokuapp.com/admin/api/deleteProperty?token=${token}&propertyId=${id}`, requestOptions)
      .then(response => response.json())
      .then(result => setUsers(result.properties))
      .catch(error => console.log('error', error));
  }
  window.location.reload()
  }

  const changeForm=(id)=>{
    console.log("id of property ",id)
    localStorage.setItem("p_id", id)
    // window.location.href = window.location.origin + "/admin/property/update";
    navigate('/admin/property/update')
  }

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = useMemo(() => {
    return userList.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, userList]);

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
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">User</TableCell>
            <TableCell align="left">Location</TableCell>
            <TableCell align="left">Rent</TableCell>
            <TableCell align="left">Description</TableCell>
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
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{row.userid.username}</TableCell>
              <TableCell align="left">{row.location}</TableCell>
              <TableCell align="left">{row.rent}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell>
                <button aria-label="" class="react-calendar__navigation__arrow bg-green-500 px-3 py-2 rounded-lg transition text-white mr-2" type="button" onClick={()=>{changeForm(row._id)}}>Edit</button>
                <button aria-label="" class="react-calendar__navigation__arrow bg-green-500 px-3 py-2 rounded-lg transition text-white" type="button" onClick={()=>{PropertyDelete(row._id)}}>Delete</button>
                {/* <Link to='property/update'>Edit</Link> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default Banner1;

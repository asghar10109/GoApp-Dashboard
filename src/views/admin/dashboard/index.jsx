import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/dashboard/components/WeeklyRevenue";
import TotalSpent from "views/admin/dashboard/components/TotalSpent";
import PieChartCard from "views/admin/dashboard/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import React, { useMemo, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import Widget from "components/widget/Widget";
import CheckTable from "views/admin/dashboard/components/CheckTable";
import ComplexTable from "views/admin/dashboard/components/ComplexTable";
import DailyTraffic from "views/admin/dashboard/components/DailyTraffic";
import TaskCard from "views/admin/dashboard/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";

const Dashboard = () => {
  const [userList, setUsers] = useState([]);
  const [PropertyList, setProperty] = useState([]);
  const [MaintenanceList, setMaintenance] = useState([]);
  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      console.log('dsjfgjh')
      // navigate('/auth/login')
    }
  },[])
 

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

  const landlord = userList.filter(uType => uType.usertype === "landlord");
  const landlordCount = landlord.length;
  console.log("landlord",landlordCount)
  
  useEffect(() => {
    foo()
    foo1()
    foo2()
  }, [])
  
  
  const foo1 =()=>{
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
      fetch(`https://homeapplication251.herokuapp.com/admin/api/property?token=${token}`, requestOptions)
      .then(response => response.json())
      .then(result => setProperty(result.properties))
      .catch(error => console.log('error', error));
  }
  
  const foo2 = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    console.log(token);
    fetch(`https://homeapplication251.herokuapp.com/admin/api/maintenance?token=${token}`, requestOptions)
      .then(response => response.json())
      .then(result => setMaintenance(result.maintenances))
      .catch(error => console.log('error', error));
  };

  console.log("MaintenanceList :",MaintenanceList)
  
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5 3xl:grid-cols-4">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"No.of.Users"}
          subtitle={userList.length}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"No.of.Maintenance"}
          subtitle={MaintenanceList.length}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"No.of.Properties"}
          subtitle={PropertyList.length}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"No.of.Landords"}
          subtitle={landlordCount}
        />
        
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Complex Table , Task & Calendar */}

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

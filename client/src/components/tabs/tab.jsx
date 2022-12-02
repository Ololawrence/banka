import * as React from 'react';

import {  useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createAccount } from './../../features/accountSice';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


const [credentials,setCredentials]= useState("")
const dispatch = useDispatch();


  const handleChanges = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(credentials)
    dispatch(createAccount(credentials))
    
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Create Account" {...a11yProps(0)} />
          <Tab label="Debit account" {...a11yProps(1)} />
          <Tab label="Credit account" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       <div style={{width:"50%", margin:"auto"}}>
          <form className="loginBox"  onSubmit = {handleClick}>
            <input
              placeholder="Address"
              required
              className="loginInput"
              id="address"
              onChange={handleChanges}
            />
            <input
              placeholder="phone number"
              required
              className="loginInput"
              id="number"
               onChange={handleChanges}
            />
            <input
              placeholder="opening balance"
              id="balance"
              required
              className="loginInput"
              type="number"
               onChange={handleChanges}
 
            />
            <input
              placeholder="account type"
              id="type"
              required
              className="loginInput"
              autoComplete="true"
              type="text"
              onChange={handleChanges}

            />
            <button className="loginButton" type="submit">
            Debit Account
            </button>

          </form>
       </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
   <div style={{width:"50%", margin:"auto"}}>
        <form className="loginBox" style={{height:"100px"}}>
            <input
              placeholder="Amount"
              id="type"
              required
              className="loginInput"
              autoComplete="true"
              type="number"
              minLength="6"
            //   onChange={handleChange}

            />
            <button className="loginButton" type="submit">
            Debit Account
            </button>

          </form>
       </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
  <div style={{width:"50%", margin:"auto", height:"200px"}}>
          <form className="loginBox" style={{height:"100px"}}>
            <input
              placeholder="Amount"
              id="type"
              required
              className="loginInput"
              autoComplete="true"
              type="number"
              minLength="6"
            //   onChange={handleChange}

            />
            <button className="loginButton" type="submit">
            Credit account
            </button>

          </form>
       </div>
      </TabPanel>
    </Box>
  );
}
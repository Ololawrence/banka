import * as React from 'react';
import {  useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {toast} from 'react-toastify';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createAccount } from './../../features/accountSice';
import { setloggedUsers, debitAccount, creditAccount } from './../../features/transactionSlice';
import { getAllTransaction, resetState } from "../../features/allTransactionSlice";
import { useNavigate } from 'react-router-dom';

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
const [disabledForm, setDisabledForm] = useState(false)
const [credentials,setCredentials]= useState("")
const [debit, setDebit] = useState("")
const [credit, setCredit] = useState("")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


const navigate = useNavigate();
const dispatch = useDispatch();

const account = useSelector(state => state.account);
const transaction = useSelector(state => state.transaction);
  const handleChanges = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  const handleDebitChanges = (e) => {
        setDebit((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  const handleCreditChanges = (e) => {
        setCredit((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(createAccount(credentials))
    
  }

  const handleDebit = (e) => {
    e.preventDefault();
    dispatch(debitAccount(debit))
  }

  const handleCredit = (e ) => {
      e.preventDefault();
    dispatch(creditAccount(credit))
  }
const handleRefresh = () => {
  window.location.reload()
}


  useEffect(() => {
    try{

      dispatch(setloggedUsers());
       
       dispatch(getAllTransaction())
      
     
    }catch(error){
      if(error){
        console.log(error)
      }
    }
  }, [dispatch])
  

    useEffect(() => {
    if (account?.accountStatus === "success") {
      toast.success(account?.account?.message,
       { position:"bottom-center" });
    }
    if (account?.accountStatus === "pending") {
      toast.warning("please wait ....", { position: "top-center" });
    }
    if (account?.accountStatus=== "rejected") {
      toast.warning(account?.account?.message, { position: "top-center" });
    }
    if (transaction?.creditSuccess === "success") {
      toast.success(transaction?.transaction?.message, { position: "top-center" });
    }
    if (transaction?.debitSuccess === "success") {
      toast.success(transaction?.transaction?.message, { position: "top-center" });
    }
  
  if ( transaction?.setUser?.error === "Invalid Token" ){
          toast.warning("please re-signin into your account", { position: "top-center" });
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("transactions");
    dispatch(resetState);
          navigate("/login")

  }
    account?.account?.errors?.map(err => {
            return toast.warning(err.phone, { position: "top-center" });

    } )
  const user = JSON.parse(localStorage.getItem("user"));
  if(user){
    setDisabledForm(!false)
}


  }, [account?.accountStatus, account, dispatch, transaction?.debitSuccess,transaction?.transaction?.message,
    transaction?.creditSuccess]);



  return (
    <Box sx={{ width: '100%' }} onLoad = {() => handleRefresh()}>
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
              disabled={disabledForm}
            />
            <input
              placeholder="phone number"
              required
              className="loginInput"
              id="phone"
               onChange={handleChanges}
                 disabled={disabledForm}
            />
            <input
              placeholder="opening balance"
              id="openingbalance"
              required
              className="loginInput"
              type="number"
               onChange={handleChanges}
   disabled={disabledForm}
            />
            <select 
              placeholder="account type"
              id="type"
              name= "type"
              required
              className="loginInput"
              autoComplete="true"
              type="text"
              onChange={handleChanges}
                disabled={disabledForm}
            >
              <option>Current account</option>
              <option>Savings  account</option>
              
              </select>
            <button className="loginButton" type="submit"   disabled={disabledForm}>
            Create Account
            </button>

          </form>
       </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
   <div style={{width:"50%", margin:"auto"}}>
        <form className="loginBox" style={{height:"100px"}} onSubmit={handleDebit}>
            <input
              placeholder="Amount"
              id="amount"
              required
              className="loginInput"
              autoComplete="true"
              type="number"
              minLength="6"
              onChange={handleDebitChanges}

            />
            <button className="loginButton" type="submit">
            Debit Account
            </button>

          </form>
       </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
  <div style={{width:"50%", margin:"auto", height:"200px"}}>
          <form className="loginBox" style={{height:"100px"}} onSubmit = {handleCredit}>
            <input
              placeholder="Amount"
              id="amount"
              required
              className="loginInput"
              autoComplete="true"
              type="number"
              minLength="6"
              onChange={handleCreditChanges}

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
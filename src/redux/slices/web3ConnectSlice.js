import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../contract/contract';
import Web3 from 'web3';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import store from "../store";

export const initialState = {
    web3: null,
    contract: null,
    accounts: [],
    allNfts: [],
    web3LoadingErrorMessage: null
}


//web3
//contract
//acounts

export const connect = createAsyncThunk("loadBlockchain", async (_, thunkAPI) => {
    try {
        //network should be rinkeby
        console.log("Web3.givenProvider.chainId ", Web3.givenProvider.chainId)
        if (window.ethereum) {
            let web3 = new Web3(window.ethereum);
       
       
            console.log("web3", web3)
           
            const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            const accounts = await web3.eth.getAccounts();
           
            return {
                web3,
                accounts,
                contract,
            }
        }
        else {
            return {
                web3LoadingErrorMessage: "error in connecting wallet"
            }
        }

    }
    catch (error) {
        console.log("error", error)
    }
})


export const  fetchData =  createAsyncThunk("updateAccount", async (_, thunkAPI) => {
    try {
      
     let  allNfts = await store.getState().web3Connect.contract.methods.getMyts().call();
      
            return  {
                allNfts
          
            }
        } 
    
    catch (error) {
        console.log("error", error)
    }
})



const web3ConnectSlice = createSlice({
    name: "Web3Connect1",
    initialState,
    reducers: {},
    extraReducers: {
        [connect.fulfilled.toString()]: (
            state,
            { payload }
        ) => {
            state.web3 = payload?.web3;
            state.contract = payload?.contract;
            state.accounts = payload?.accounts;

        },

        [fetchData.fulfilled.toString()]: (
            state,
            { payload }
        ) => {
            state.allNfts = payload?.allNfts;

        }
      
    }

});

export const web3Reducer = web3ConnectSlice.reducer;
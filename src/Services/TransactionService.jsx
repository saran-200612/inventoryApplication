import axios from 'axios';

const STOCK_URL="http://localhost:9191/invent/stock";
const TRANS_URL="http://localhost:9191/invent/trans";
const ID_URL="http://localhost:9191/invent/trans-id";
const ANA_URL="http://localhost:9191/invent/analysis";

export const saveTransaction=(transaction)=>{
    return axios.post(STOCK_URL,transaction,{
        withCredentials:true
    });
}

export const findTransactionById=(id)=>{
    return axios.get(`${STOCK_URL}/${id}`,{
        withCredentials:true
    });
}

export const removeTransactionById=(id)=>{
    return axios.delete(`${STOCK_URL}/${id}`,{
        withCredentials:true
    });
}

export const transactionIdGenerate=()=>{
    return axios.get(`${ID_URL}/${flag}`, {
        withCredentials:true
    });
}

export const findTransactionByType=(type)=>{
    return axios.get(`${TRANS_URL}/${type}`,{
        withCredentials:true
    });
}

export const getDemandByProduct=(product)=>{
    return axios.get(`${ANA_URL}/${product}`,{
        withCredentials:true
    });
}

export const getDemandByDate=(date)=>{
    return axios.get(`${ANA_URL}/date/${date}`,{
        withCredentials:true
    });
}   
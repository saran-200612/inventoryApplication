import axios from 'axios';

const SKU_URL='http://localhost:9191/invent/sku';
const ID_URL='http://localhost:9191/invent/sku-id';



export const saveSKU=(sku)=> {
	return axios.post(SKU_URL,sku,{
        withCredentials:true
    });
   
}


export const getAllSKUs=()=> {
	return axios.get(SKU_URL,{
        withCredentials:true
    });
   
}


export const getSKUById=(id)=> {
	return axios.get(SKU_URL+'/'+id,{
        withCredentials: true
    });
}


export const deleteSKUById=(id)=> {
	return axios.delete(SKU_URL+'/'+id,{
        withCredentials:true
    });
}


export const updateSKU=(sku)=> {
	return axios.put(SKU_URL,sku,{
        withCredentials:true
    });
}

 export const getAllSkuIds=()=>{
	return axios.get(ID_URL,{
        withCredentials:true
    });
 
}

import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {saveSKU} from "../../Services/SKUService";
import '../../DisplayView.css';

const SKUEntry = () => {
 let navigate=useNavigate();
    const [errors,setErrors]=useState({});
    const [flag,setFlag]=useState(false);
    
    const [skuData,setSkuData]=useState({
          skuId:"",
	      skuDescription:"",
       });

    useEffect(() => {
     setFlag(false);
    }, []);
     
    const createNewSKU = (event) => {
        event.preventDefault();
        saveSKU(skuData).then((response)=>{
         setFlag(true);
             });
      };

      const  onChangeHandler = (event) =>{
         event.persist();
         setFlag(false);
         const name = event.target.name;
         const value = event.target.value;
           setSkuData(values =>({...values, [name]: value }));
        };
          
        const handleValidation = (event) => {
         event.preventDefault();
         let tempErrors = {};
         let isValid = true;
     
         if (!skuData.skuId.trim()) {
           tempErrors.skuId = "SKU Id is required";
           isValid = false;
         }
     
         if (!skuData.skuDescription.trim()) {
           tempErrors.skuDescription = "SKU description is required";
           isValid = false;
         }
             
        setErrors(tempErrors);
         if (isValid) {
           createNewSKU(event);
         }
     };

     const returnBack=()=>{
        navigate('/admin-menu');  
   };
 
   const nextEntry=()=>{
    skuData.category="";
    skuData.skuDescription="";
    skuData.skuId="";
     navigate('/sku-entry');
   }
    
    return(
     <div>
       <br/>
       <div className = ".container">
         <div className = "row">
           <div className = "card col-md-2 offset-md-3 offset-md-3">
             <div className = "login-box">
               <h2 className="text-center"><u>New SKU Entry</u> </h2>
               <br/>
               <form>
                 <div className = "form-group">
                   <label>SKU ID: </label>
                   <input placeholder="sku Id" name="skuId" className="form-control" value={skuData.skuId} onChange={(event) => onChangeHandler(event)} />
                   {errors.skuId && <p style={{ color: "red" }}>{errors.skuId}</p>}
                 </div>
                 <div className = "form-group">
                   <label>SKU Description: </label>
                   <input placeholder="skuDescription"   name="skuDescription" className="form-control" value={skuData.skuDescription} onChange={(event) => onChangeHandler(event)}/>
                   {errors.skuDescription && <p style={{ color: "red" }}>{errors.skuDescription}</p>}
                 </div>
                 <div className = "form-group">            
                   <button className='btn btn-primary' onClick={handleValidation}>Submit</button>
                   &nbsp; &nbsp;
                   <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-success">Return</button>  
                 </div>    
               </form>
               <br/>
              <div>
                 {flag && <p style={{ color: "blue" }}>New SKU Added...<button className='btn btn-primary' onClick={nextEntry}>Next Entry</button> </p>}
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
}
export default SKUEntry;
import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {getProductById,editProductStock} from '../../Services/ProductService';
import {getUserId} from '../../Services/LoginService';
import {transactionIdGenerate,saveTransaction} from '../../Services/TransactionService';

const ProductStockEdit = () => {

    const [product,setProduct] = useState({
        productId:"",
        productName: "",
        skuId:"",
        purchasePrice: 0.0,
        salesPrice:0.0,
        reorderLevel:0.0,
        stock:0.0,
        vendorId:"",
        status:true,
    });

    const [newId, setNewId]=useState(0);
    const [errors, setErrors] = useState({});
    const [flag,setFlag]=useState("");
    const [userId,setUserId]=useState("");
    const [tdate,setTdate]=useState(new Date());

    const [transaction,setTransaction]=useState({
        transactionId:0,
        transactionType:"",
        productId:"",
        rate:0.0,
        quantity:0.0,
        transactionValue:0.0,
        userId:"",
        transactionDate:new Date(),
    });

    let navigate=useNavigate();
    let param=useParams();

    const [quantity,setQuantity]=useState(0.0);
    const [transValue, setTransValue] = useState(null);
    const [warns,setWarns]=useState(null);

    const setProductData=()=>{
        getProductById(param.pid).then(response => {
            setProduct(response.data);
            setFlag(param.no);
        });
    }

    const setUserData=()=>{
        getUserId().then(response => {
            setUserId(response.data);
        });
    }

    const setTransactionId=()=>{
        transactionIdGenerate(param.no).then(response=>{
            setNewId(response.data);
        })
    }

    useEffect(() => {
        setProductData();
        setUserData();
        setTransactionId();
    }, []);

    const returnBack=()=>{
        navigate('/product-repo');
    }

    const clearAll=()=>{
        setQuantity(0.0);
    }

    const stockEdit=(event)=>{
        event.preventDefault();

        transaction.transactionId=newId;
        transaction.productId=product.productId;
        transaction.quantity=quantity;
        transaction.userId=userId;
        transaction.transactionDate=tdate;

        if(flag==="1"){
            transaction.transactionType="IN";
            transaction.rate=product.purchasePrice;
        }
        else if(flag==="2"){
            transaction.transactionType="OUT";
            transaction.rate=product.salesPrice;
        }

        transaction.transactionValue=parseFloat(transaction.rate)*parseFloat(quantity);
        setTransValue(transaction.transactionValue);

        if(flag==="2"){
            let balance=product.stock-quantity;
            if(balance<=product.reorderLevel)
                setWarns("Stock reached to Re-Order Level.....")
        }

        saveTransaction(transaction);
        editProductStock(product,quantity,flag);
    }

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!String(quantity).trim()) {
            tempErrors.quantity = "Transaction Quantity is required";
            isValid = false;
        }
        else if (parseFloat(quantity) <=0) {
            tempErrors.quantity="Transaction Quantity cannot be 0 or negetive";
            isValid = false;
        }

        if(flag==="2"){
            if(parseFloat(quantity)>product.stock){
                tempErrors.quantity="Issued Quantity cannot be more than stock";
                isValid = false;
            }
        }

        setErrors(tempErrors);
        if (isValid) {
            stockEdit(event);
        }
    };

    return (
        <div>
            <div className="col-md-12 text-center">
                {
                    parseInt(flag)===1 ?
                    <h3><u>Stock Purchase Entry</u></h3> :
                    <h3><u>Stock Issue Entry</u></h3>
                }
            </div>

            <div className="card col-md-6 offset-md-3">
                <div className="card-body" align="center">
                    <table className="table table-bordered">
                        <tr><td>Product Id:</td><td>{product.productId}</td></tr>
                        <tr><td>SKU Id:</td><td>{product.skuId}</td></tr>
                        <tr><td>Product Name:</td><td>{product.productName}</td></tr>
                        <tr>
                            <td>{parseInt(flag)===1 ? "Purchase Price:" : "Sales Price:"}</td>
                            <td>{parseInt(flag)===1 ? product.purchasePrice : product.salesPrice}</td>
                        </tr>
                        <tr><td>Re Order Level:</td><td>{product.reorderLevel}</td></tr>
                        <tr><td>Stock:</td><td>{product.stock}</td></tr>
                        <tr><td>Vendor:</td><td>{product.vendorId}</td></tr>
                    </table>
                </div>
            </div>

            <div className="card col-md-6 offset-md-3">
                <div className="card-body" align="center">
                    <form>
                        <div className="form-group">
                            <label>Transaction Id:</label>
                            <input className="form-control" value={newId}/>
                        </div>

                        <div className="form-group">
                            <label>Select Transaction Date:</label>
                            <input type="date" className="form-control"
                                value={tdate}
                                onChange={(event)=>setTdate(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Quantity:</label>
                            <input className="form-control"
                                value={quantity}
                                onChange={(event)=>setQuantity(event.target.value)}
                            />
                            {errors.quantity && <p style={{ color: "red" }}>{errors.quantity}</p>}
                        </div>

                        <button className="btn btn-success" onClick={handleValidation}>Save</button>
                        <button className="btn btn-secondary" onClick={clearAll}>Reset</button>
                        <button className="btn btn-success" onClick={returnBack}>Return</button>
                    </form>

                    {transValue !== null && <b>Transaction Value: ₹{transValue}</b>}
                    {warns && <div style={{color:"red"}}>{warns}</div>}
                </div>
            </div>
        </div>
    );
}

export default ProductStockEdit;
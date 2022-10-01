import React from 'react';

const PaymentInfo = ({order,status=true}) => {
     console.log(order);
    return (
        <div className='row mb-3'>
            {/* <div className='col-md-6 col-sm-6 col-sm-5 d-flex flex-column flex-start'>
            <table className='table table-border table-dark'>
             <tbody>
                <tr>
                    <td scope='col'>Order Id:</td>
                    <td scope='col'>{id}</td>
                </tr>
                <tr>
                    <td scope='col'>Ordered On:</td>
                    <td scope='col'>{new Date(created*1000).toLocaleString()}</td>
                </tr>
                {status && <tr className='text-bold text-primary'>
                    <td  scope='col'>Status:</td>
                    <td scope='col'>{order.orderStatus}</td>
                </tr>}
              </tbody>
            </table>
            </div>
            <div className='col-md-6 col-sm-6 d-flex flex-column'>
                <table className='table table-border table-dark'>
                <tbody>
                    <tr>
                        <td scope='col'>Amount:</td>
                        <td scope='col'>{(amount /= 100).toLocaleString("en-US",{
                  style:"currency",
                  currency:"USD",
              })}</td>
                    </tr>
                    <tr>
                        <td scope='col'>Currency::</td>
                        <td scope='col'>{currency.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td scope='col'>Method:</td>
                        <td scope='col'>{payment_method_types[0]}</td>
                    </tr>
                </tbody>
                </table>
            </div> */}
        </div>
    );
};

export default PaymentInfo;
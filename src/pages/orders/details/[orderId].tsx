import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useGetOrderQuery, useChangeStatusMutation } from 'services/coreApi/orders'

const orderDetails = () => {
  const router = useRouter()
  const statusRef = useRef<null|HTMLSelectElement>(null)
  const [showConfirmChangeStatus, setShowConfirmChangeStatus] = useState(false)
  const [changeStatus] = useChangeStatusMutation()
  const { data, isSuccess } = useGetOrderQuery(router.query.orderId as string)
  const [order, setOrder] = useState<any>(null)
  const [buyer, setBuyer] = useState<any>(null)
  const [products, setProducts] = useState<any>(null)

  useEffect(()=>{
    if(isSuccess){
        setOrder(data.data.order.order)
        setBuyer(data.data.order.order.buyer)
        setProducts(data.data.order.order.products)
    }
  }, [isSuccess])

  const handleOnChange = () => {
    setShowConfirmChangeStatus(true)
  }

  const handleChangeStatus = () => {
    if(statusRef.current){
      changeStatus({ orderId:router.query.orderId as string, status:statusRef.current.value})  
    }
    setShowConfirmChangeStatus(false)
  }

  return (
    <div className='w-full pt-10 px-5'>
        <div className='flex gap-2'>
          <h3 className='text-4xl font-bold mb-2'>Order</h3>
          {isSuccess && (
            <>
              <select className='outline-0 border-b-2 border-black p-0 h-[2rem]' name="state" ref={statusRef} onChange={handleOnChange}>
                  <option selected={data.data.order.state ==='done'} value="done">done</option>
                  <option selected={data.data.order.state ==='in-process'} value="in-process">in-process</option>
                  <option selected={data.data.order.state ==='canceled'} value="canceled">canceled</option>
              </select>
              { showConfirmChangeStatus && <button onClick={handleChangeStatus}>confirm</button> }
            </>
          )}
        </div>

        {(isSuccess && order && buyer && products) && (
          <>
            <div className='flex gap-10 mb-10'>
              <div><span className='font-bold'>orderId: </span>{data.data.order.id}</div>
              <div><span className='font-bold'> payment Method:</span>{ order.paymentMethod }</div>
              <div><span className='font-bold'>Total Amount:</span>{order.totalAmount}</div>
            </div>

              {/* BUYER */}
            <div>
                <div className='font-bold text-xl'>Buyer</div>
                <div>
                  <span className='font-bold'>firstName:</span>
                  {buyer.firstName}
                </div>
                <div>
                  <span className='font-bold'>lastName:</span>
                  {buyer.lastName}
                </div>
                <div>
                  <span className='font-bold'>email:</span>
                  {buyer.email}
                </div>
                <div>
                  <span className='font-bold'>phone:</span>
                  {buyer.phone}
                </div>


                 {/* DIRECTION  */}
                <div>
                  <p className='font-bold mt-10'>direction</p>
                  <ul>
                    <li>
                    <span className='font-bold'>city:</span>
                      { buyer.direction.city }
                    </li>
                    <li>
                      <span className='font-bold'>street:</span>
                      { buyer.direction.street }
                    </li>
                    <li>
                      <span className='font-bold'>house Number:</span>
                      { buyer.direction.houseNumber }
                    </li>
                    <li>
                      <span className='font-bold'>references:</span>
                      { buyer.direction.references }
                    </li>
                  </ul>
                </div>
            </div>

             {/* PRODUCTS */}
            <div className='mt-10'>
              <h3 className="text-2xl font-bold mb-2">Products</h3>
              {products.map((product:any)=>(
                <div className='' key={'orderProductsList'+product.id}>
                    <div><span className='font-bold'>id:</span>{product.id}</div>
                    <div><span className='font-bold'>name:</span>{product.name}</div>
                    <div><span className='font-bold'>price:</span>{product.price}</div>
                </div>
              ))}
            </div>
          </>
        )}




    </div>
  )
}

export default orderDetails

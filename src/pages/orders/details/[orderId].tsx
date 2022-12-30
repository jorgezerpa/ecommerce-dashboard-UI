import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useGetOrderQuery } from 'services/coreApi/orders'

const orderDetails = () => {
  const router = useRouter()
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

  return (
    <div className='w-full pt-10 px-5'>
        <h3 className='text-2xl font-bold mb-2'>Order</h3>
        {(isSuccess && order && buyer && products) && (
          <>
            <div className='flex gap-10 mb-1'>
              <div><span className='font-bold'>orderId: </span>{data.data.order.id}</div>
              <div><span className='font-bold'>orderStatus: </span>{data.data.order.state}</div>
            </div>

            <div className='flex gap-10 mb-10'>
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

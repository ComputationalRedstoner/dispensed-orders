'use client'
import { ArrowDown, ArrowUp, Download, Filter, Square, SquareCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DetailsPanel({ selectedDate }) {

  /* SQL */
    const [orders, setOrders] = useState([]);
    const [mouseMoved, setMouseMoved] = useState(0)
    const onMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      setMouseMoved(x + y)
    };

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`/api/orders?date=${selectedDate}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          }
          );
  
          const data = await response.json();
          setOrders(data.orders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
  
      

      fetchOrders();
    }, [mouseMoved]);

    useEffect(() => {
      const resetDetails = async () => {
        try {
          if (typeof(selectedOrder) !== 'undefined') {
            setSelectedOrder(undefined)
          } 
        } catch (error) {
          console.error('Error resetting selectedOrder: ', error)
        }
      }

      resetDetails();
    }, [selectedDate])

    const [selectedOrder, setSelectedOrder] = useState()

    const [detailsSelected, setDetailsSelected] = useState(true)

    const details = false

    const noodles = {
      'Mee Kia' : 'meekia.jpg',
      'Mee Pok' : 'meepok.jpeg',
      'Kway Teow' : 'kwayteow.jpg',
      'Mee Tai Mak' : 'meetaimak.jpg',
      'Yellow Noodle' : 'yellownoodles.jpg',
      'Bee Hoon' : 'beehoon.png',
      'Wanton Mee' : 'wantonmee.png'
    }
  
    const handleOrderClick = (order) => {
      setSelectedOrder(order);
    };

    const handleDetailsClick = () => {
      setDetailsSelected((details) => !details);
    };

    return (
      <section className="details-panel cursor-default h-screen" onMouseMove={onMouseMove}>
        

        <div className="dpContent flex flex-col mt-12">
        <div className="orders w-full">
        {/* Order List */}
        <div className="mb-4 bg-gray-200 flex flex-col p-4 w-full shadow-lg rounder">
          <div className="items-center">
            <h3 className="flex justify-between items-center font-bold mb-3 mx-2 text-center">
              Dispensed Orders <Filter className="cursor-pointer"/>
              </h3>
          </div>
          <div className="order-list mb-1 overflow-y-auto h-48 bg-white rounded no-scrollbar shadow-md">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className={`order-item px-4 py-2 cursor-pointer ${
                  typeof(selectedOrder) !== 'undefined' && selectedOrder.order_id === order.order_id
                  ? 'bg-gray-300'
                  : 'hover:bg-gray-100'
                }`}
                onClick={() => handleOrderClick(order)}
              >
                {order.order_id}
              </div>
            ))}
          </div>
        </div>

        {/* Re-dispense Details */}
        <div className="flex items-center justify-between mb-4 p-2">
            Re-dispensed
            {typeof(selectedOrder) !== 'undefined' && selectedOrder.redispense === 1
            ? <SquareCheck/>
            : <Square/>}
        </div>
          <div>
            {typeof(selectedOrder) !== 'undefined' && selectedOrder.redispense === 1
            ? 
            <div className="text-center">
              <div className="flex justify-between mb-1.5 text-3xl bg-gray-200 hover:bg-gray-300 flex flex-col p-4 w-full shadow-lg rounder">
              <span>{selectedOrder.time_redispensed}</span>
              </div> 
              <p className="text-xl mb-16">Time Re-dispensed</p>
            </div>
            : ''
}
            <div className={`hidden download flex justify-between text-2xl bg-gray-700 hover:bg-gray-800 flex flex-col p-4 w-full shadow-lg rounder text-slate-200 cursor-pointer`}>
                <span className="flex items-center justify-between">Download Order<Download/></span>
            </div>
        </div>
      </div>

          <div className="image-section mx-3 w-full">
            <img src={`${typeof(selectedOrder) !== 'undefined' ? noodles[selectedOrder.noodle] : 'blank_noodle.png'}`} alt="" className="detailsImg flex shadow-xl"/>
            {/* Photos of Noodles */}
            
            <div className="order-info w-full">
              <h2 className="justify-between bg-gray-200 hover:bg-gray-300 flex flex-col p-4 shadow-lg w-full text-center rounder mt-4">
                {typeof(selectedOrder) !== 'undefined'
            ? selectedOrder.noodle
            : '-'}
                </h2>
              <div className="justify-between bg-gray-200 hover:bg-gray-300 flex flex-col p-4 shadow-lg w-full text-center rounder mt-4">
                <p className="text-3xl">
                  PO Number
                </p>
                <p className="text-5xl">
                {typeof(selectedOrder) !== 'undefined'
            ? selectedOrder.po_num
            : '-'}
                </p>
                </div>
              <div className="justify-between bg-gray-200 hover:bg-gray-300 flex flex-col p-4 shadow-lg w-full text-center rounder mt-5">
                <p className="text-3xl">
                  Order Number
                </p>
                <p className="text-4xl">
                {typeof(selectedOrder) !== 'undefined'
            ? selectedOrder.order_number
            : '-'}
                </p>
              </div>
            </div>
            
          </div>
        <div className="details w-full">

          <div className={`flex ${
                detailsSelected === details ? "" : "items-center"} justify-between`}>
            <div className={`flex ${
                detailsSelected === details ? "mt-3" : "block"} justify-between w-0`}>
              Sauces
            </div>
              <div className={`${
                detailsSelected === details ? "w-full max-h-80" : "w-52 max-h-16 items-center"
              } bg-gray-500 flex justify-between p-3 rounder overflow-hidden transition-all duration-300 shadow-lg settings-icon hover:bg-gray-600`} 
              onClick={() => handleDetailsClick(handleDetailsClick)}>
                
                <div className="text-slate-200 flex flex-col justify-between">
                {detailsSelected === details
                ? <div className="text-slate-200 transition-all duration-700">
                    <p className="underline">Details</p>
                    <p>Vinegar</p>
                    <p>Ketchup</p>
                    <p>Chilli</p>
                    <p>Lard</p>
                    <p>Fish Sauce</p>
                  </div>
                : <p>Details</p>}
                </div>
              <div>
              {
              detailsSelected === details
              ? <div key={'details'} className="text-slate-200 flex flex-col items-end transition-all duration-700">
                
              <ArrowUp className="mt-1 mb-2 text-slate-300"/>
                <p key={'vinegar'}>{typeof(selectedOrder) !== 'undefined' ? selectedOrder.vinegar : '-'}</p>
                <p key={'ketchup'}>{typeof(selectedOrder) !== 'undefined' ? selectedOrder.ketchup : '-'}</p>
                <p key={'chilli'}>{typeof(selectedOrder) !== 'undefined' ? selectedOrder.chilli : '-'}</p>
                <p key={'lard'}>{typeof(selectedOrder) !== 'undefined' ? selectedOrder.lard : '-'}</p>
                <p key={'fish_sauce'}>{typeof(selectedOrder) !== 'undefined' ? selectedOrder.fish_sauce : '-'}</p>
                </div>
                : <div className="text-slate-300">
                  <ArrowDown/>
                  </div>
              }
              </div>
            </div>
            
          </div>
          

          <div className="flex items-center justify-between">
            <div className="mr-8">
              Time Purchased
            </div>
            <div className="w-52 bg-gray-200 hover:bg-gray-300 flex flex-col p-3 rounder shadow-lg">
            {typeof(selectedOrder) !== 'undefined'
            ? selectedOrder.time_purchase
            : '-'}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="mr-8">
              Time Dispensed
            </div>
            <div className="w-52 bg-gray-200 hover:bg-gray-300 flex flex-col p-3 rounder shadow-lg">
            {typeof(selectedOrder) !== 'undefined'
            ? selectedOrder.time_dispensed
            : '-'}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              Dine In
            </div>
            <div className="w-52 bg-gray-200 hover:bg-gray-300 flex flex-col p-3 rounder shadow-lg">
            {typeof(selectedOrder) !== 'undefined'
            ? selectedOrder.dine
            : '-'}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              Recipe
            </div>
            <div className="w-52 bg-gray-200 hover:bg-gray-300 flex flex-col p-3 rounder shadow-lg">
            {typeof(selectedOrder) !== 'undefined'
            ? selectedOrder.recipe
            : '-'}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              Size
            </div>
            <div className="w-52 bg-gray-200 hover:bg-gray-300 flex flex-col p-3 rounder shadow-lg">
            {typeof(selectedOrder) !== 'undefined'
            ? selectedOrder.size
            : '-'}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              Soup
            </div>
            <div className="w-52 bg-gray-200 hover:bg-gray-300 flex flex-col p-3 rounder shadow-lg">
            {typeof(selectedOrder) !== 'undefined'
            ? selectedOrder.soup
            : '-'}
            </div>
          </div>
          </div>
        </div>
      </section>
    )
  }
  
  
'use client';
import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export default function Sidebar({ date, setDate, isOpen, toggleSidebar }) {
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0); // State to store the total number of orders
  const [orderReCount, setReOrderCount] = useState(0); // State to store the total number of re-dispensed orders

  useEffect(() => {
    const fetchOrders = async () => {
      const selectedDate = date.toLocaleDateString("en-CA")
      try {
        const response = await fetch(`/api/orders?date=${selectedDate}`);
        const data = await response.json();
        setOrderCount(data.totalOrders); // Set the total order count
        setReOrderCount(data.totalReOrders); // Set the total order count
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [date]);

  const currentDate = new Date()
  const year = currentDate.getFullYear()

  return (
    <aside
      className={`sidebar select-none overflow-hidden fixed top-0 left-0 h-full bg-gray-100 z-50 transition-all transform duration-300 sidebar-rounder shadow-md shadow-slate-500 ${
        isOpen ? 'closed' : 'open no-doc-scroll'
      }`}
      onClick={(e) => e.stopPropagation()} // Prevent click from closing the sidebar
    >
      <div className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? (
          <Button variant="ghost">
            <img src="/calendar.png" className="icon" />
          </Button>
        ) : (
          <Button variant="secondary">
            <img src="/calendar.png" className="icon" />
          </Button>
        )}
      </div>
      <div className={`sideContent ${isOpen ? 'hidden' : ''}`}>
        <div className="calendar">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate} // Update the selected date
            className="overflow-hidden"
            classNames={{
              months:
                "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
              month: "space-y-4 w-full flex flex-col",
              table: "w-full h-full border-collapse space-y-1",
              head_row: "",
              row: "w-full mt-2",
            }}
            captionLayout="dropdown-buttons"
            fromYear={1968}
            toYear={year}
          />
        </div>
        <div className="pCal text-center" suppressHydrationWarning={true}>
          {date ? `${date.toLocaleDateString("en-SG")}` : 'Pick a day'}
        </div>
        <div className="mt-5 w-84">
          <p className="pCal">{orderCount} Orders Dispensed</p> {/* Display total order count */}
          <p className="pCal">{orderReCount} Re-dispensed</p>
        </div>

        <a>
          <div className="hidden additional-details flex w-full justify-between text-2xl bg-gray-700 hover:bg-gray-800 flex flex-col p-4 w-72 shadow-lg rounder text-slate-300 tooltip-container">
            <div className="flex items-center justify-between cursor-pointer text-slate-200">
              Download Orders <Download />
            </div>

            <div className="tooltip-content rounder">
              Download ALL order details for the day
            </div>
          </div>
        </a>
      </div>
    </aside>
  );
}

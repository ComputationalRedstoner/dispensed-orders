'use client'
import { Settings } from "lucide-react";

let currentDate = new Date();
const day = currentDate.getDate();
const monthNum = currentDate.getMonth(); 
const year = currentDate.getFullYear();
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
const fullDate = day + " " + months[monthNum] + " " + year;

export default function Header() {
    return (
      <header className="header items-center select-none fixed z-50">
        <h1 className="p-2">{fullDate}</h1>
        <div className="settings-icon mx-2 hidden"><Settings /></div>
      </header>
    );
  }
  
import React from "react"
import { createRoot } from "react-dom/client"
import MyCalendar from "./components/CalendarComponent"

const container = document.getElementById("calendar-root")
const root = createRoot(container)
root.render(<MyCalendar />)
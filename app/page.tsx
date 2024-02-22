'use client'

import HomePage from "@/components/HomePage";
import "./page.css";
import { SnackbarProvider } from "notistack";

export default function Home() {

  
  return(
<SnackbarProvider autoHideDuration={3000} anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}>
  <HomePage /></SnackbarProvider>
  );
}

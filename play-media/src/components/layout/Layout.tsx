import React, { PropsWithChildren, useState } from "react";
import Sidebar from "./Sidebar";



const Layout = (props: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase'>
        Next.js sidebar menu
      </header>
      <div className='flex flex-col md:flex-row flex-1'>
        <aside className='bg-fuchsia-100 w-full md:w-60'>
          <nav>
          <ul >
          <li>links here</li>
          <li>links here</li>
        </ul>
          </nav>
        </aside>
        <main className='flex-1'>{props.children}</main>
      </div>
    </div>
  );
};

export default Layout;

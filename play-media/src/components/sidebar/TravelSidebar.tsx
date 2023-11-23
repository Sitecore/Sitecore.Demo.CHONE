import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useContext, useState } from 'react';
import ThemeSwitcherContext from '../../store/themeSwitcherContext';

export const TravelSidebar = () => {

  return (
<div className= "min-h-screen flex flex-row bg-gray-100">
  <div className="flex flex-col w-56 bg-gray rounded-r-3xl overflow-hidden">
    <div className="flex items-center justify-center h-20 shadow-md">
      <h1 className="text-3xl uppercase text-indigo-500">Logo</h1>
    </div>
    <ul className="flex flex-col py-4">
      <li>
        <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-home"></i></span>
          <span className="text-sm font-medium">Mountain Biking</span>
        </a>
      </li>
      <li>
        <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-music"></i></span>
          <span className="text-sm font-medium">Hiking</span>
        </a>
      </li>
      <li>
        <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-drink"></i></span>
          <span className="text-sm font-medium">Scuba Diving</span>
        </a>
      </li>
      <li>
        <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-shopping-bag"></i></span>
          <span className="text-sm font-medium">Yoga</span>
        </a>
      </li>
    </ul>
  </div>
</div>
  );
};

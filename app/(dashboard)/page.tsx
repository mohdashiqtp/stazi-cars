"use client"
import React, { useEffect, useState } from 'react';
import CarCard from '@/components/carCard';
import { Car } from '@/types/types';
import { Search } from "lucide-react";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [carData, setCarData] = useState<Car[]>([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalItems = searchResults.length > 0 ? searchResults.length : carData.length; // Use searchResults if available, otherwise use carData
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const carsToDisplay = searchResults.length > 0 ? searchResults.slice(startIndex, endIndex) : carData.slice(startIndex, endIndex);
  const [searchTrue, setSearchTrue] = useState(false);

  useEffect(() => {
    fetch('/car.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Check if data is fetched
        setCarData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.history.pushState(null, '', `/page=${newPage}`);
  };

  const handleSearch = () => {
    const filteredData = carData.filter((car) =>
      car.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredData);
    if(filteredData.length === 1){
        setSearchTrue(true)
    }
  };
  const handleInputKeyDown = (e : any) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <div className="h-full">
      <div className="p-5 flex justify-center items-center">
        <div className="shadow-md rounded-lg p-3 w-[80%]">
          <div className="bg-white w-[30%] rounded-lg flex h-[50px] justify-between p-3">
            <input
              type="text"
              className="bg-transparent text-black w-[70%]"
              placeholder="Search cars..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown} 
            />
            <button
              onClick={handleSearch}
              className="text-black text-2xl"
            >
              <Search />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full p-4 ml-2">
        <div className="grid grid-cols-3 gap-4 w-[80%]">
        {
            searchTrue ? searchResults.map((car) => (
                <CarCard
                  key={car.title}
                  title={car.title}
                  image={car.image}
                  start_production={car.start_production}
                  class={car.class}
                />
            )) : carsToDisplay.map((car) => (
                <CarCard
                  key={car.title}
                  title={car.title}
                  image={car.image}
                  start_production={car.start_production}
                  class={car.class}
                />
              ))
          }
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[80%] h-[70px] rounded-lg shadow-md p-5 mb-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 text-gray-400 shadow-lg p-2 rounded-lg"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 text-gray-400 shadow-lg p-2 rounded-lg ${
                currentPage === index + 1
                  ? 'font-semibold bg-gray text-white'
                  : ''
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={endIndex >= totalItems}
            className="text-gray-400 shadow-lg p-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

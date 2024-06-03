import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
   <div class="flex flex-col h-screen bg-gray-100">
<div class="flex-1 flex flex-wrap">

    <div class="p-2 bg-white w-full md:w-60 flex flex-col md:flex hidden" id="sideNav">
        <nav>
            <a class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" href="#">
                <i class="fas fa-home mr-2"></i>Inicio
            </a>
            <a class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" href="#">
                <i class="fas fa-file-alt mr-2"></i>Autorizaciones
            </a>
            <a class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" href="#">
                <i class="fas fa-users mr-2"></i>Usuarios
            </a>
            <a class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" href="#">
                <i class="fas fa-store mr-2"></i>Comercios
            </a>
            <a class="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" href="#">
                <i class="fas fa-exchange-alt mr-2"></i>Transacciones
            </a>
        </nav>
    </div>
    <div class="flex-1 p-4 w-full md:w-1/2">
        
        <div class="relative max-w-md w-full">
            <div class="absolute top-1 left-2 inline-flex items-center p-2">
                <i class="fas fa-search text-gray-400"></i>
            </div>
            <input class="w-full h-10 pl-10 pr-4 py-1 text-base placeholder-gray-500 border rounded-full focus:shadow-outline" type="search" placeholder="Buscar..."/>
        </div>

           
        <div class="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
           
            <div class="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
                <h2 class="text-gray-500 text-lg font-semibold pb-1">Usuarios</h2>
                <div class="my-1"></div> 
                <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                <div class="chart-container" >
                  
                    <canvas id="usersChart"></canvas>
                </div>
            </div>
            <div class="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
                <h2 class="text-gray-500 text-lg font-semibold pb-1">Comercios</h2>
                <div class="my-1"></div>
                <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                <div class="chart-container">
                  
                    <canvas id="commercesChart"></canvas>
                </div>
            </div>
        </div>
        <div class="mt-8 bg-white p-4 shadow rounded-lg">
            <h2 class="text-gray-500 text-lg font-semibold pb-4">Autorizaciones Pendientes</h2>
            <div class="my-1"></div>
            <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
            
          
            <div class="text-right mt-4">
                <button class="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                    Ver más
                </button>
            </div>
        </div>
       
    </div>
</div>
</div>
    </div>
  );
};

export default SideBar;

import React from "react";
import LOGO2 from '../img/LOGO2.png';

function LoadingInsumos() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#333',
            animation: 'blink 1s infinite',
            margin: '0 5px',
          }}
        />
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#333',
            animation: 'blink 1s infinite',
            margin: '0 5px',
          }}
        />
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#333',
            animation: 'blink 1s infinite',
            margin: '0 5px',
          }}
        />
      </div>
      <img
        src={LOGO2}
        alt="Logo de la empresa"
        style={{
          width: '220px', // Ajusta el tamaño de la imagen según tus necesidades
          height: '100px',
          marginBottom: '50px',
        }}
      />
      <h1>Bienvenido A Forgama Soft...</h1>
      <h1>Cargando Insumos...</h1>
    </div>
  );
}

export default LoadingInsumos;

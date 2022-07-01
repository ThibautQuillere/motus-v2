import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css';

function mot(): any {
  let mot = ['b','l','u','s','i','n']
  return mot; 
}


function renderRow():any {
  return (
    <ul className='row'>
      {mot().map((x: any) => <li className='letter'>{x}</li>)}
    </ul>
  )
}

  
function createLayout(): any {
  return (
  <div className='motus-app'>
    <div className='layout'>
      <h1 className='layout__title'>
        React M<span>o</span>tus
      </h1>
      <div className='wrapper'>
        <section className="grid">
          {renderRow()}
        </section>
      </div>
    </div>
  </div>
    
  );
}

const el = document.getElementById('root')
if (el === null) throw new Error('Root container missing in index.html')
  
const root = ReactDOM.createRoot(el)
root.render(
  <React.StrictMode>
    {createLayout()}
  </React.StrictMode>
)

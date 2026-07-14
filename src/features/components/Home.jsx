import { useEffect, useState } from "react";
import { HeaderNav } from "./nav/HeaderNav";
import { SideNav } from "./nav/SideNav";
import { FileWriter } from "./Files/FileWriter";
import { TestCard } from "./TestCard";
import { useDownloadData } from "../../context/hooks/use";

export const Home = () => {
  const [showSidePanel, setShowSidePanel] = useState(true);
  const { urlQueue } = useDownloadData();

  useEffect(()=>{
    console.log( urlQueue );

  }, [urlQueue])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Header */}
      <HeaderNav setShowSidePanel={setShowSidePanel} />

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with smooth width transition */}
        <div
          className={`
            transition-all duration-300 ease-in-out shrink-0
            ${showSidePanel ? 'w-64' : 'w-0'}
            overflow-hidden
          `}
        >
          <SideNav
            showSidePanel={showSidePanel}
            setShowSidePanel={setShowSidePanel}
          />
        </div>

        {/* Main content – fills remaining space */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* <div className="max-w-6xl mx-auto">
            <TestCard />
          </div> */}
          {
            Object.entries(urlQueue).map(([url, fileDetail])=>(
              <div key={url} className="max-w-6xl mx-auto">
                <FileWriter url={url} fileDetail={fileDetail} />
              </div>
            ))
          }
          {/* <div className="max-w-6xl mx-auto">
            <FileWriter />
          </div> */}


        </main>
      </div>
    </div>
  );
};



// old App.jsx

// import { invoke } from "@tauri-apps/api/core";
// const [greetMsg, setGreetMsg] = useState("");
//   const [name, setName] = useState("");

//   async function greet() {
//     // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
//     setGreetMsg(await invoke("greet", { name }));
//   }

//   return (
//     <main className="container">
//       <h1>Welcome to Tauri + React</h1>

//       <div className="row">
//         <a href="https://vite.dev" target="_blank">
//           <img src="/vite.svg" className="logo vite" alt="Vite logo" />
//         </a>
//         <a href="https://tauri.app" target="_blank">
//           <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <p>Click on the Tauri, Vite, and React logos to learn more.</p>

//       <form
//         className="row"
//         onSubmit={(e) => {
//           e.preventDefault();
//           greet();
//         }}
//       >
//         <input
//           id="greet-input"
//           onChange={(e) => setName(e.currentTarget.value)}
//           placeholder="Enter a name..."
//         />
//         <button type="submit">Greet</button>
//       </form>
//       <p>{greetMsg}</p>
//     </main>
//   );
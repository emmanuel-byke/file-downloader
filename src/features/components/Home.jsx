import { useState } from "react";
import { HeaderNav } from "./nav/HeaderNav";
import { SideNav } from "./nav/SideNav";
import { FileWriter } from "./Files/FileWriter";


export const Home = () => {
    const [showSidePanel, setShowSidePanel] = useState(true);


    return(
        <div className="flex flex-col">
            <HeaderNav setShowSidePanel={setShowSidePanel} />
            <div className="flex flex-row gap-2">
                <SideNav showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel}/>
                <FileWriter />
            </div>
        </div>
    );
}




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
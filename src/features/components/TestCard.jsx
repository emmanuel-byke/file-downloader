import { invoke } from "@tauri-apps/api/core";

import { File, Pause, Play, Trash2, X } from "lucide-react";
import { useState } from "react";
import { mainCommand } from "../../context/commands";
import { useFileManagerData } from "../../context/hooks/use";

export const TestCard = () => {
    
    const [textInput, setTextInput] = useState("");
    const { changeSettings, settings } = useFileManagerData();
    const [text, setText] = useState("Init...");

    const submit = async() => {
        // const result = await invoke("button_clicked");
        // setText(result);
        // handleRun();

        // setText(settings.name||"Hello");

        await changeSettings ({
            name: "Galaxy S23"
        });
    }

    const handleRun = async() => {
        try {
            const result = await invoke("simple_command", { command: mainCommand(textInput) });
            setText(result);
        } catch (err) {
            setText(`Error: ${err}`);
        }
    }

  return (
    <div className="max-w-lg w-full bg-white rounded-xl shadow-md border border-gray-200 p-5 space-y-4 transition-shadow hover:shadow-lg">
      
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <p className="text-md font-medium text-gray-800 truncate">{settings.name}</p>
        </div>
      </div>

      <div>
          <label htmlFor="test-input" className="block text-sm font-bold text-gray-700 mb-1">
            Text
          </label>
          <input
            id="test-input"
            type='text'
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

      
      <div className="flex items-center justify-between gap-2 text-xs font-medium text-gray-600">
        <button
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
            onClick={submit}
          >
            Ok
          </button>
      </div>

    </div>
  );
};


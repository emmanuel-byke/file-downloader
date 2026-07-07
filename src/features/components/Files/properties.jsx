import { useState } from "react"



export const attributes = () => {
    const [state, setState] = useState({name: 'running', id: 1}); //running (1), paused (2), completed(3)
    const [schedule, setSchedule] = useState({id:1, name: 'default', queued: true});
    const [tags, setTags] = useState([]); //file, media, movie, application, music, video, compressed, other, picture
    return {
        state, setState,
        schedule, setSchedule,
        tags, setTags, 
    }
}

export const properties = () => {
    return {
        url: '',
        fileName: '',
        extension: '',
    }
}



export const attributes = () => {
    return {
        state: {name: 'running', id: 1}, //running (1), paused (2), completed(3)
        schedule: {id:1, name: 'default', queued: true}, //default, 
        tags: [], //file, media, movie, application, music, video, compressed, other, picture
    }
}

export const properties = () => {
    return {
        url: '',
        fileName: '',
        extension: '',
    }
}
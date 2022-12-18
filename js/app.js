if ('serviceWorker' in navigator){
    navigator.serviceWorker
        .register('./sw.js')
        .then((reg) => console.log("Service Worker: Registration Complete"))
        .catch((err) => console.log("Service Worker: Registration Failed"))
}
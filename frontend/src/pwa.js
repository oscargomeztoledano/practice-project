// Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
    console.log('Registering Service Worker');
    navigator.serviceWorker
        .register('/sw.js')  // Cambié la ruta a '/sw.js' ya que el Service Worker debería estar en 'public'
        .then(function (registration) {
            console.log('Service Worker Registered', registration.scope);
        })
        .catch(function (error) {
            console.log('Service Worker Registration Failed', error);
        });
    console.log('Finished Service Worker Registration');
}

// Code to handle install prompt on desktop
let deferredPrompt;
const pwaBtnAndroid = document.getElementById('android-installer');
const pwaBtnWindows = document.getElementById('windows-installer');
const pwaBtnApple = document.getElementById('ios-installer');

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event triggered');
    e.preventDefault();
    deferredPrompt = e;
    
    if (pwaBtnWindows) {
        pwaBtnWindows.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    }

    if (pwaBtnAndroid) {
        pwaBtnAndroid.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    }
    if (pwaBtnApple) {
        pwaBtnApple.addEventListener('click', () => {
            alert("Para instalar esta aplicación en su dispositivo iOS, toque el botón 'Compartir' en Safari y seleccione 'Agregar a la pantalla de inicio'.");
        });
    }
});

const butInstall = document.getElementById('buttonInstall');
console.log(butInstall)
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  console.log('beforeinstallprompt')
  window.deferredPrompt = event;
  butInstall.classList.toggle('hidden', false)
  
});

butInstall.addEventListener('click', async () => {
    console.log('hello ')
  const prompt = window.deferredPrompt;
  if (prompt) {
    prompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    console.log(prompt);
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
      // Open a new window to your server's URL
      window.open('http://localhost:5000', '_blank');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
    butInstall.style.display = 'none';
  }
});

window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully');
});

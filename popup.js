document.getElementById("connectAll").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: autoConnect,
  });
  document.getElementById("statusText").innerText = "Starting...";
});

function autoConnect() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const randomDelay = () => delay(Math.floor(Math.random() * 800) + 400);

  const waitForElement = async (selector, timeout = 3000) => {
    const interval = 100;
    const maxTries = timeout / interval;
    for (let i = 0; i < maxTries; i++) {
      const el = document.querySelector(selector);
      if (el) return el;
      await new Promise((res) => setTimeout(res, interval));
    }
    return null;
  };

  (async () => {
    const buttons = [...document.querySelectorAll("button")].filter((btn) => {
      return btn.innerText.trim() === "Connect";
    });
    const total = buttons.length;

    for (let i = 0; i < total; i++) {
      const button = buttons[i];
      button.scrollIntoView({ behavior: "smooth", block: "center" });
      button.click();
      const sendBtn = await waitForElement(
        'button[aria-label="Send without a note"]'
      );

      if (sendBtn && !sendBtn.disabled) {
        console.log("Clicking Send without a note");
        sendBtn.click();
      } else {
        const dismissBtn = document.querySelector(
          'button[aria-label="Dismiss"]'
        );
        if (dismissBtn) {
          console.log("Dismissing modal");
          dismissBtn.click();
        }
      }

      await randomDelay();
    }

    // Update status when done
    const statusDiv = document.getElementById("statusText");
    if (statusDiv) statusDiv.innerText = "✅ Done connecting!";
  })();
}

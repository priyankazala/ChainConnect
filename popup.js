document.getElementById("connectAll").addEventListener("click", async () => {
  const numPages = parseInt(document.getElementById("pageCount").value || "1");
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  document.getElementById("statusText").innerText = "Starting...";

  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      function: autoConnect,
      args: [numPages],
    })
    .then(() => {
      document.getElementById("statusText").innerText = " Done connecting!";
    })
    .catch((err) => {
      document.getElementById("statusText").innerText = " Error occurred.";
      console.error(err);
    });
});

function autoConnect(numPages) {
  (async () => {
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

    const clickConnectButtons = async () => {
      const buttons = [...document.querySelectorAll("button")].filter((btn) => {
        return btn.innerText.trim() === "Connect";
      });

      for (const button of buttons) {
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
    };

    const goToNextPage = async () => {
      const nextBtn = document.querySelector('button[aria-label="Next"]');
      if (nextBtn && !nextBtn.disabled) {
        nextBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        nextBtn.click();
        await delay(3000); // wait for page to load
        return true;
      }
      return false;
    };

    for (let page = 0; page < numPages; page++) {
      await clickConnectButtons();
      if (page < numPages - 1) {
        const hasNext = await goToNextPage();
        if (!hasNext) break;
      }
      await randomDelay();
    }

    console.log("✅ Done connecting!");
  })();
}

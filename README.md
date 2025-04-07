# ChainConnect Chrome Extension

**ChainConnect** is a Chrome Extension designed to automate the process of connecting with LinkedIn users. By simply clicking the "Connect All" button, it will automatically click the "Connect" buttons on LinkedIn profiles and send connection requests with or without a note.

---

## Features

- **Automated LinkedIn Connect**: Automatically clicks the "Connect" button on LinkedIn profiles.
- **Send Connection Request Without Note**: If available, it will click the "Send without a note" button.
- **User-Friendly Popup**: Provides a clean and simple user interface to interact with the extension.

---

## Installation

1. Clone or download the repository.
2. Open **Chrome** and go to the [Extensions](chrome://extensions/) page.
3. Enable **Developer Mode** by toggling the switch in the top right corner.
4. Click on **Load unpacked** and select the folder where the extension is located.
5. The extension should now be installed and available in your browser.

---

## How to Use

1. Once the extension is installed, click the **ChainConnect** extension icon in your Chrome toolbar to open the popup.
2. On LinkedIn, navigate to the list of users you want to connect with.
3. Click the **"Connect All"** button in the popup.
4. The extension will automatically send connection requests to the users it finds.

---

## Files

- `popup.html`: The HTML structure for the popup interface.
- `popup.js`: Contains the logic for connecting with LinkedIn users and sending connection requests.
- `background.js`: (Optional) Handles background tasks like messaging and event listeners.

---

## Customization

- You can adjust the size of the popup by modifying the **width** and **height** in the CSS within the `popup.html` file.
- The connection button's appearance and animations can be customized by changing the CSS styles in `popup.html`.

---

## Contributing

Feel free to fork this project and submit pull requests. If you find any bugs or have feature requests, please create an issue on GitHub.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

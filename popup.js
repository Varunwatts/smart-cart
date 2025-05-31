document.getElementById("addItem").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const priceRegex = /₹\s?([\d,]+)/;
        let priceText = document.body.innerText.match(priceRegex);
        let price = priceText ? parseInt(priceText[1].replace(/,/g, "")) : 0;
        return { url: window.location.href, price: price };
      }
    }, ([result]) => {
      if (result && result.result) {
        const newItem = result.result;
        chrome.storage.local.get(["cart"], (data) => {
          const cart = data.cart || [];
          cart.push(newItem);
          chrome.storage.local.set({ cart }, () => {
            updateUI(cart);
          });
        });
      }
    });
  });
});

document.getElementById("saveThreshold").addEventListener("click", () => {
  const threshold = parseInt(document.getElementById("threshold").value);
  if (!isNaN(threshold)) {
    chrome.storage.local.set({ threshold }, () => {
      chrome.storage.local.get("cart", (data) => {
        updateUI(data.cart || [], threshold);
      });
    });
  }
});

document.getElementById("clearCart").addEventListener("click", () => {
  chrome.storage.local.set({ cart: [] }, () => {
    updateUI([], 0);
  });
});

function updateUI(cart = [], thresholdValue = null) {
  chrome.storage.local.get(["threshold"], (data) => {
    const threshold = thresholdValue !== null ? thresholdValue : data.threshold || 0;
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    document.getElementById("total").innerText = `₹${total}`;
    document.getElementById("cartItems").innerHTML = cart
      .map(item => `<li><a href="${item.url}" target="_blank">${item.url}</a> - ₹${item.price}</li>`)
      .join("");

    const status = document.getElementById("status");

    if (threshold && total > threshold) {
      status.innerText = "⚠️ Limit exceeded!";
      sendThresholdExceededEmail(total, threshold);
    } else {
      status.innerText = "";
    }
  });
}

chrome.storage.local.get(["cart", "threshold"], (data) => {
  updateUI(data.cart || [], data.threshold);
});

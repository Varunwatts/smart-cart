chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getItem") {
    const hostname = window.location.hostname;
    let name = "Unknown Item";
    let price = 0;

    if (hostname.includes("amazon")) {
      name = document.querySelector("#productTitle")?.innerText || name;
      const priceText = document.querySelector(".a-price .a-offscreen")?.innerText;
      price = parsePrice(priceText);
    } else if (hostname.includes("flipkart")) {
      name = document.querySelector("span.B_NuCI")?.innerText || name;
      const priceText = document.querySelector("div._30jeq3._16Jk6d")?.innerText;
      price = parsePrice(priceText);
    } else if (hostname.includes("ajio")) {
      name = document.querySelector("h1.title")?.innerText || name;
      const priceText = document.querySelector("div.prod-sp")?.innerText;
      price = parsePrice(priceText);
    } else if (hostname.includes("myntra")) {
      const brand = document.querySelector("h1.pdp-name")?.innerText;
      const product = document.querySelector("h1.pdp-title")?.innerText;
      if (brand && product) name = `${brand} ${product}`;
      const priceText = document.querySelector("span.pdp-price")?.innerText;
      price = parsePrice(priceText);
    }

    sendResponse({ name: name.trim(), price });
  }
  return true;
});

function parsePrice(priceText) {
  if (!priceText) return 0;
  return parseInt(priceText.replace(/[^\d]/g, "")) || 0;
}

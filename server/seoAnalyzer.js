const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

async function fetchWithAxios(url) {
  const res = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120"
    },
    timeout: 10000
  });
  return res.data;
}

async function fetchWithPuppeteer(url) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120"
  );

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  const html = await page.content();
  await browser.close();

  return html;
}

async function analyzeSEO(url) {
  let html;

  try {
    html = await fetchWithAxios(url);
  } catch (err) {
    // Axios failed → fallback to Puppeteer
    html = await fetchWithPuppeteer(url);
  }

  const $ = cheerio.load(html);

  return {
    title: $("title").text() || "Missing",
    metaDescription:
      $('meta[name="description"]').attr("content") || "Missing",
    h1Count: $("h1").length,
    imagesWithoutAlt: $("img:not([alt])").length,
    totalLinks: $("a").length,
    analyzedWith: html.includes("<html") ? "puppeteer/axios" : "unknown"
  };
}

module.exports = analyzeSEO;

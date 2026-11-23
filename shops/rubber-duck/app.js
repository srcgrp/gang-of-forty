'use strict';

/* ---------- Settings ---------- */
const API_URL = '../../api/products.json';   // from shops/<slug>/index.html
const CATEGORY_ID = 2;                       // "dairy" in categories.json; products use this number as categoryId
const SKELETON_COUNT = 5;

/* ---------- Helpers ---------- */
const priceFormat = new Intl.NumberFormat('fa-IR');                // ۱۶۵٬۰۰۰
const toFaDigits = (value) => String(value).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

/* Create an element; text always goes through textContent (never innerHTML). */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

async function fetchJson(url) {
  const res = await fetch(url);
  // fetch does NOT throw on 404/500, so we check res.ok ourselves
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

/* ---------- Rendering ---------- */
function createCard(product) {
  const li = el('li');
  const card = el('article', 'card');

  const thumb = el('div', 'thumb', product.emoji);
  thumb.setAttribute('aria-hidden', 'true');

  const price = el('span', 'price');
  price.append(el('strong', '', `${priceFormat.format(product.price)} تومان`));

  const add = el('button', 'add', '+');
  add.type = 'button';
  add.setAttribute('aria-label', `افزودن ${product.name} به سبد`);

  const buy = el('div', 'buy');
  buy.append(price, add);

  card.append(thumb, el('h3', '', product.name), el('p', 'size', toFaDigits(product.unit)), buy);
  li.append(card);
  return li;
}

function createSkeleton() {
  const li = el('li');
  li.setAttribute('aria-hidden', 'true');
  const card = el('div', 'card skeleton');
  card.append(el('div', 'skel skel-thumb'), el('div', 'skel skel-line'), el('div', 'skel skel-line short'));
  li.append(card);
  return li;
}

/* ---------- Dairy carousel ---------- */
const track = document.getElementById('dairy-track');
const statusBox = document.getElementById('dairy-status');
const pager = document.getElementById('dairy-pager');

function showStatus(message, { isError = false, retry = false } = {}) {
  statusBox.replaceChildren(el('p', '', message));
  statusBox.classList.toggle('error', isError);
  statusBox.setAttribute('role', isError ? 'alert' : 'status');
  if (retry) {
    const button = el('button', 'btn btn-brand', 'تلاش دوباره');
    button.type = 'button';
    button.addEventListener('click', loadDairy);
    statusBox.append(button);
  }
  statusBox.hidden = false;
}

function showLoading() {
  pager.hidden = true;
  track.hidden = false;
  track.setAttribute('aria-busy', 'true');
  track.replaceChildren(...Array.from({ length: SKELETON_COUNT }, createSkeleton));
  showStatus('در حال بارگذاری محصولات…');
}

function showError() {
  pager.hidden = true;
  track.hidden = true;
  track.setAttribute('aria-busy', 'false');
  track.replaceChildren();
  showStatus('بارگذاری محصولات ممکن نشد. اتصال اینترنت را بررسی کنید و دوباره تلاش کنید.', { isError: true, retry: true });
}

function showProducts(products) {
  track.setAttribute('aria-busy', 'false');
  if (products.length === 0) {
    track.hidden = true;
    pager.hidden = true;
    showStatus('فعلاً محصولی در این دسته نداریم.');
    return;
  }
  statusBox.hidden = true;
  track.hidden = false;
  track.replaceChildren(...products.map(createCard));

  // The arrow links point at the first and last card, which exist only now
  track.firstElementChild.id = 'dairy-start';
  track.lastElementChild.id = 'dairy-end';
  pager.hidden = false;

  // If the page was opened with #dairy-start / #dairy-end, jump there now
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target && track.contains(target)) target.scrollIntoView();
}

let loading = false;

async function loadDairy() {
  if (loading) return;
  loading = true;
  showLoading();
  try {
    const data = await fetchJson(API_URL);
    const all = Array.isArray(data) ? data : (data.products ?? data.items ?? []);
    showProducts(all.filter((product) => product.categoryId === CATEGORY_ID));
  } catch (error) {
    console.warn('Could not load products:', error);   // expected when offline / wrong URL
    showError();
  } finally {
    loading = false;
  }
}

loadDairy();

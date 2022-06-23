import "./style.css";
import LoveCounter from "./love-counter";
import persist from "@alpinejs/persist";
import Quotes from './quotes';
import './quote.css';
// import './api';
import loveFunc  from "./vite";
import './vite';

document.querySelector("#app").innerHTML = "I 💚 Alpine JS!";

import Alpine from "alpinejs";

window.Alpine = Alpine;
Alpine.plugin(persist);
Alpine.data("loveCounter", LoveCounter);
Alpine.data('quoteApp', Quotes)
Alpine.data('love', loveFunc)

Alpine.start();

import "./style.css";
import LoveCounter from "./love-counter";
import persist from "@alpinejs/persist";
import Quotes from './quotes';


document.querySelector("#app").innerHTML = "I 💚 Alpine JS!";

import Alpine from "alpinejs";

window.Alpine = Alpine;
Alpine.plugin(persist);
Alpine.data("loveCounter", LoveCounter);
Alpine.data('quoteApp', Quotes)
Alpine.start();

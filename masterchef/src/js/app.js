/* eslint-disable */

import * as pnt from './module/printEvent';
import {
  cfg
} from "./config";

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const generate = async (pntform, print = false) => {

  const hn = document.getElementById('hn').value;

  const papi = await fetch(`${cfg.host}:${cfg.port}/patcard/${hn}`, {
      mode: 'cors'
    })
    .then(handleErrors)
    .then((response) => {
      return response.json().then((data) => {
        // console.log(data);
        switch (pntform) {
          case 'normal':
            pnt.createCard(data);
            break;
          case 'blank':
            pnt.createCard(data, false);
            break;
          case 'covid':
            pnt.createCovidCard(data);
            break;
          default:
            pnt.createCovidCard(data);
            break;
        }

      })
    })
    .catch(error => console.log(error));

  if (print) window.print();
};

(function () {

  let printCard = document.querySelectorAll('.printCard');

  for (let i = 0; i < printCard.length; i++) {
    printCard[i].addEventListener("click", () => {
      console.log(printCard[i].getAttribute('data-print'));
      let formPrint = printCard[i].getAttribute('data-print');
      generate(formPrint, true)
    });
  }

  window.onbeforeprint = pnt.beforePrint;
  window.onafterprint = pnt.afterPrint;

  // document.getElementById('print').style.display = 'block';
}());
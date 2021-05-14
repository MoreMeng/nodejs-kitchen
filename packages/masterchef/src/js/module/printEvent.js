/* eslint-disable */

export function beforePrint() {
  console.log('Functionality to run before printing.');
};

export function afterPrint() {
  console.log('Functionality to run after printing');
};

export function createCard(res, pntDate = true) {

  let item = res.recordset[0];
  // console.log(item);

  let cardLeft = document.getElementById('cardLeft');

  let pntBlock = (pntDate) ? ` <p id="pntTime">${item.print_date}</p> ` : '';

  cardLeft.innerHTML = pntBlock;

  document.getElementById('pntCID').innerText = `${item.pt_cid}`;
  document.getElementById('pntHN').innerText = `HN: ${item.hn}`;
  //  document.getElementById('pntTime').innerText = `${item.print_date}`;
  document.getElementById('pntProfile').innerText = `ชื่อ ${item.pt_name} อายุ ${item.pt_age} ปี ที่อยู่ ${item.addr1} หมู่ ${item.moo} ต.${item.moo} ต.${item.tambonName} อ.${item.regionName} จ.${item.areaName}`;

}

export function createCovidCard(res) {

  let item = res.recordset[0];
  // console.log(item);

  let cardLeft = document.getElementById('cardLeft');

  let pntMedalery = (item.drug_medalery) ? `มีประวัติแพ้ยา: ${item.drug_medalery}` : '';
  let pntMonitor = (item.drug_monitor) ? `${item.drug_monitor}` : '';

  let pntBlock = `
  <p id="pntTime">${item.print_date}</p>
  <div class="p-3 me-3 border border-2 border-secondary fst-italic">
    <p>น้ำหนัก....................ก.ก. ส่วนสูง .................. ซม.</p>
    <p>อุณหภูมิ.................. ℃</p>
    <p>ความดันครั้งที่ 1 ............/.......... mmHg P ........./ min</p>
    <p>ความดันครั้งที่ 2 ............/.......... mmHg P ........./ min</p>
    <p>CC ..........ฉีดวัคซีนโควิด-19........</p>
    <p>DX.....COVID-19 Vaccine ..... U119 9929</p>
  </div>
  <p id="pntMedalery">${pntMedalery}</p>
  <p id="pntMonitor">${pntMonitor}</p>`;

  cardLeft.innerHTML = pntBlock;


  document.getElementById('pntCID').innerText = `${item.pt_cid}`;
  document.getElementById('pntHN').innerText = `HN: ${item.hn}`;
  //  document.getElementById('pntTime').innerText = `${item.print_date}`;
  document.getElementById('pntProfile').innerText = `ชื่อ ${item.pt_name} อายุ ${item.pt_age} ปี ที่อยู่ ${item.addr1} หมู่ ${item.moo} ต.${item.moo} ต.${item.tambonName} อ.${item.regionName} จ.${item.areaName}`;
  // document.getElementById('pntMedalery').innerText = (item.drug_medalery) ? `มีประวัติแพ้ยา: ${item.drug_medalery}` : '';
  // document.getElementById('pntMonitor').innerText = (item.drug_monitor) ? `ระมัดระวังการใช้ยา: ${item.drug_monitor}` : '';
}

// "print_date": "9 พฤษภาคม 2564 12:58:43",
// "hn": "275572",
// "pt_name": "นายธนิกุล  ศรีอุทิศ",
// "pt_cid": "3150300174300",
// "pt_age": 37,
// "pt_mobilephone": "0806640448",
// "pt_phone": "",
// "nation": "ไทย",
// "addr1": "5",
// "moo": 5,
// "tambonName": "สายทอง",
// "regionName": "ป่าโมก",
// "areaName": "อ่างทอง",
// "drug_medalery": null,
// "drug_monitor": null

export default {
  beforePrint,
  afterPrint,
  createCard,
  createCovidCard
};
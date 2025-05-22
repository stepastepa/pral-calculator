const table = document.getElementById("pralTable");

const productList = [
  {name: "Овсянка", pral: 3.1},
  {name: "Изюм", pral: -21},
  {name: "Пшено", pral: 0.5},
  {name: "Гречка", pral: 3.5},
  {name: "Крекер", pral: 8.5},
  {name: "Вафля", pral: 9},
  {name: "Печенье", pral: 11},
  {name: "Шоколад", pral: 13}
];

function addRow() {
  let rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  rowDiv.innerHTML = `
    <div>
      <select onchange="onProductChange(this)">
        <option value="" data-pral="0" selected>Select Food</option>
        ${productList.map(p => `<option value="${p.name}" data-pral="${p.pral}">${p.name}</option>`).join('')}
      </select>
    </div>
    <div class="mass"><input type="number" value="100"></div>
    <div class="pral"><input type="number" value="0" readonly></div>
    <div><button onclick="removeRow(this)">✖</button></div>
  `;
  table.appendChild(rowDiv);
}

function removeRow(currentBtn) {
  const row = currentBtn.closest(".row");
  row.remove();
}

function onProductChange(select) {
  const selectedOption = select.options[select.selectedIndex];
  const pralValue = selectedOption.getAttribute("data-pral");
  const pralInput = select.parentNode.nextElementSibling.nextElementSibling.querySelector('input');

  pralInput.value = pralValue || 0;
  pralInput.readOnly = true;
}

function calculatePRAL() {
  let total = 0;
  let masses = table.querySelectorAll(".mass");
  let prals = table.querySelectorAll(".pral");

  for(let i = 0; i < masses.length; i++) {
    let currentMass = parseFloat(masses[i].querySelector("input").value);
    let currentPral = parseFloat(prals[i].querySelector("input").value);;
    total += currentMass * currentPral / 100;
  }

  document.getElementById("result").textContent = "Total PRAL: " + total.toFixed(2);
}
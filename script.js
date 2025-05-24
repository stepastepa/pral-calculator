const table = document.getElementById("pralTable");

const productList = [
  {name: "Овсянка", pral: 3.1},
  {name: "Пшено", pral: 0.5},
  {name: "Гречка", pral: 3.5},
  {name: "Горох", pral: 3.5},
  {name: "Изюм", pral: -21},
  {name: "Крекер", pral: 8.5},
  {name: "Вафля", pral: 9},
  {name: "Печенье", pral: 11},
  {name: "Шоколад", pral: 13}
];

function addCard() {
  if(document.querySelector(".plus")) {
    document.querySelector(".plus").remove(); // remove plus
  }

  let i = table.children.length;

  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.innerHTML = `
    <div class="food item">
      <label for="foodSelect-${i}">Food</label>
      <select onchange="onProductChange(this)" id="foodSelect-${i}">
        <option value="" data-pral="0" selected>Select Food</option>
        ${productList.map(p => `<option value="${p.name}" data-pral="${p.pral}">${p.name}</option>`).join('')}
      </select>
    </div>
    <div class="mass item">
      <label for="massInput-${i}">Mass</label>
      <input type="number" value="100" id="massInput-${i}">
    </div>
    <div class="pral item">
      <label for="pralInput-${i}">PRAL(100g)</label>
      <input type="number" value="0" readonly id="pralInput-${i}">
    </div>
    <div class="delete">
      <button onclick="removeRow(this)"></button>
    </div>
  `;
  table.appendChild(cardDiv);

  addPlus(); // add plus
}

function addPlus() {
  let plusDiv = document.createElement("div");
  plusDiv.classList.add("plus");
  plusDiv.innerHTML = `
    <button onclick="addCard()">+</button>
  `;
  table.appendChild(plusDiv);
}

// add initial first row:
addCard();

function removeRow(currentBtn) {
  const row = currentBtn.closest(".card");
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
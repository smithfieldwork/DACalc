// Get the radio buttons and other text elements
const englishRadio = document.getElementById("English");
const gaeligeRadio = document.getElementById("Gaeilge");

// Get text elements to translate
const bannerTitle = document.querySelector("#banner h1");
const incomeLabel = document.querySelector('label[for="weekly-income"]');
const savingsLabel = document.querySelector('label[for="savings-investments"]');
const outputDiv = document.getElementById("output");
const income = document.getElementById("weekly-income");
const savingsInvestments = document.getElementById("savings-investments");
const calculateBtn = document.getElementById("calculate-btn");

// Functions to adjust pay
function payAfterSavingsInvestmentsAdjustment() {
  let adjustedIncome = 244;
  const savingsValue = parseFloat(savingsInvestments.value);

  if (savingsValue < 0) {
    adjustedIncome = -1;
  } else if (savingsValue >= 0 && savingsValue <= 50000) {
    // no change to adjustedIncome
  } else if (savingsValue > 50000 && savingsValue <= 60000) {
    adjustedIncome -= (savingsValue - 50000) / 1000;
  } else if (savingsValue > 60000 && savingsValue <= 70000) {
    adjustedIncome += -50 - (savingsValue - 60000) / 500;
  } else if (savingsValue > 70000) {
    adjustedIncome += -70 - (savingsValue - 70000) / 250;
  }

  return adjustedIncome;
}

function payAfterIncomeAdjustment(payAfterSavingsInvestments) {
  let adjustedIncome = payAfterSavingsInvestments;
  const incomeValue = parseFloat(income.value);

  if (incomeValue <= 165 && incomeValue >= 0) {
    adjustedIncome += incomeValue;
  } else if (incomeValue > 165 && incomeValue <= 375) {
    adjustedIncome += 165 + 0.5 * (incomeValue - 165);
  } else if (incomeValue > 375 && incomeValue < 514) {
    adjustedIncome = 514;
  } else if (incomeValue > 514) {
    adjustedIncome = incomeValue;
  } else if (incomeValue < 0) {
    adjustedIncome = -1;
  }

  return adjustedIncome;
}

function payAfterTotalAdjustments() {
  const adjustmentOne = payAfterSavingsInvestmentsAdjustment();
  const adjustmentTwo = payAfterIncomeAdjustment(adjustmentOne);

  if (adjustmentTwo < 0) {
    return 0;
  }
  return Math.round(adjustmentTwo * 100) / 100;
}

// Event listener for the "Calculate" button
calculateBtn.addEventListener("click", function () {
  const finalPay = payAfterTotalAdjustments();
  const incomeValue = parseFloat(income.value);
  const socialWelfarePayment = finalPay - incomeValue; // Difference

  // Check the selected language and update the output accordingly
  if (gaeligeRadio.checked) {
    outputDiv.textContent = `Is é d'ioncam seachtainiúil nua ná €${finalPay.toFixed(
      2
    )}. Is é d'íocaíocht leasa shóisialaigh ná €${socialWelfarePayment.toFixed(
      2
    )}.`;
  } else {
    outputDiv.textContent = `Your gross weekly income is €${finalPay.toFixed(
      2
    )}. Your social welfare payment is €${socialWelfarePayment.toFixed(2)}.`;
  }
});

// Language toggle event listeners
englishRadio.addEventListener("change", updateLanguage);
gaeligeRadio.addEventListener("change", updateLanguage);

function updateLanguage() {
  if (gaeligeRadio.checked) {
    // Switch to Irish
    bannerTitle.textContent = "Áireamhán Liúntas Míchumais";
    incomeLabel.textContent = "Ioncam Seachtainiúil:";
    savingsLabel.textContent = "Coigiltis agus Infheistíochtaí:";
    calculateBtn.textContent = "Ríomh";
  } else if (englishRadio.checked) {
    // Switch to English
    bannerTitle.textContent = "Disability Allowance Calculator";
    incomeLabel.textContent = "Weekly Income:";
    savingsLabel.textContent = "Savings and Investments:";
    calculateBtn.textContent = "Calculate";
  }
}

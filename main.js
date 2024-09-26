import "./style.css";
import {
  RadixDappToolkit,
  DataRequestBuilder,
  RadixNetwork,
} from "@radixdlt/radix-dapp-toolkit";
import { GatewayApiClient } from "@radixdlt/babylon-gateway-api-sdk";

// Inject the navbar into the DOM
document.querySelector("#login").innerHTML = `
    <div id="navbar">
    </div>
    <div id="connect-btn">
      <radix-connect-button />
    </div>
`;

// You can create a dApp definition in the dev console at https://stokenet-console.radixdlt.com/dapp-metadata
// then use that account for your dAppDefinitionAddress
const dAppDefinitionAddress =
  "account_tdx_2_12y7ue9sslrkpywpgqyu3nj8cut0uu5arpr7qyalz7y9j7j5q4ayhv6";

// Instantiate Radix Dapp Toolkit for connect button and wallet usage.
const rdt = RadixDappToolkit({
  networkId: RadixNetwork.Stokenet,
  applicationVersion: "1.0.0",
  applicationName: "Hello Token dApp",
  applicationDappDefinitionAddress: dAppDefinitionAddress,
});
console.log("dApp Toolkit: ", rdt);

// Instantiate Gateway API for network queries
const gatewayApi = GatewayApiClient.initialize(rdt.gatewayApi.clientConfig);
console.log("gatewayApi: ", gatewayApi);

// Global States
let accounts;
let accountAddress;
let componentAddress =
  "component_tdx_2_1cz44jlxyv0wtu2cj7vrul0eh8jpcfv3ce6ptsnat5guwrdlhfpyydn";

// ************ Fetch the user's account address ************
rdt.walletApi.setRequestData(DataRequestBuilder.accounts().atLeast(1));
// Subscribe to updates to the user's shared wallet data
rdt.walletApi.walletData$.subscribe((walletData) => {
  console.log("subscription wallet data: ", walletData);
  // add all shared accounts to the account select dropdown
  accounts = walletData.accounts;
  let accountSelect = document.getElementById("select-dropdown");
  accountSelect.innerHTML = "";
  accounts.map((account) => {
    console.log("account: ", account);
    let shortAddress =
      account.address.slice(0, 4) +
      "..." +
      account.address.slice(account.address.length - 6, account.address.length);
    let li = document.createElement("li");
    li.setAttribute("role", "option");
    li.classList.add(`account-appearance-${account.appearanceId}`);
    li.innerHTML = `
      <label for="${account.label}">
        ${account.label} ${shortAddress}
      </label>
      <input type="radio" name="${account.label}" value="${account.address}" />
    `;
    accountSelect.appendChild(li);
  });

  checkIfSelectShouldBeEnabled();
  checkIfClaimShouldBeEnabled();

  // Custom Account Select
  const customSelect = document.querySelector(".custom-select");
  const selectBtn = document.querySelector(".select-button");

  const selectedValue = document.querySelector(".selected-value");
  const optionsList = document.querySelectorAll(".select-dropdown li");

  optionsList.forEach((option) => {
    function handler(e) {
      // Click Events
      if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
        selectedValue.textContent = this.children[0].textContent;
        console.log("selectedValue: ", selectedValue.textContent);
        accountAddress = this.children[1].value;
        console.log("accountAddress: ", accountAddress);
        customSelect.classList.remove("active");
        optionsList.forEach((op) => {
          op.children[1].checked = false;
        });
        this.children[1].checked = true;
        selectBtn.classList = `select-button border-none account-appearance-${
          accounts.find((account) => account.address === this.children[1].value)
            .appearanceId
        }`;
      }
      // Key Events
      if (e.key === "Enter") {
        selectedValue.textContent = this.textContent;
        customSelect.classList.remove("active");
      }
      checkIfClaimShouldBeEnabled();
    }

    option.addEventListener("keyup", handler);
    option.addEventListener("click", handler);
  });
});

function checkIfClaimShouldBeEnabled() {
  const getHelloTokenBtn = document.querySelector("#get-hello-token");
  // clear the account address when none is connected
  if (!accounts.length) {
    accountAddress = "";
  }
  // enable the get hello token button if an account address is selected
  if (accountAddress) {
    getHelloTokenBtn.disabled = false;
  } else {
    getHelloTokenBtn.disabled = true;
  }
}
function checkIfSelectShouldBeEnabled() {
  const selectedValue = document.querySelector(".selected-value");
  const selectBtn = document.querySelector(".select-button");
  // enable the select button if there are accounts to select from
  if (accounts.length) {
    selectedValue.textContent = "Select an Account";
    selectBtn.disabled = false;
    // add event listener to select button
    selectBtn.addEventListener("click", toggleCustomSelect);
  } else {
    selectedValue.textContent = "Setup Dev Mode to choose an account";
    selectBtn.disabled = true;
    // remove event listener to select button
    selectBtn.removeEventListener("click", toggleCustomSelect);
  }
}
function toggleCustomSelect() {
  const customSelect = document.querySelector(".custom-select");
  const selectBtn = document.querySelector(".select-button");
  // add/remove active class on the container element
  customSelect.classList.toggle("active");
  // update the aria-expanded attribute based on the current state
  selectBtn.setAttribute(
    "aria-expanded",
    selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
  );
}

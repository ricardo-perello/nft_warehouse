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
  accounts.map((account) => {
    console.log("account: ", account);
    // Fetch NFTs for this account
    console.log("gatewayApi: ", gatewayApi);
    fetchNFTsForAccount(account.address);

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


// Fetch NFTs for a given account
async function fetchNFTsForAccount(accountAddress) {
  try {
    const response = await fetch("https://stokenet.radixdlt.com/state/entity/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addresses: [accountAddress],
      }),
    });

    const accountData = await response.json();
    console.log(accountData);

    // Extract non-fungible resources
    const nonFungibleResources = accountData.items[0].non_fungible_resources.items;

    for (const resource of nonFungibleResources) {
      const resourceAddress = resource.resource_address;
      const nftCount = resource.amount;
      console.log(resourceAddress);
      console.log(nftCount);

      // Fetch each NFT's data
      for (let i = 0; i < nftCount; i++) {
        const nftId = `#${i}#`;
        await fetchNFTDetails(resourceAddress, nftId);
      }
    }
  } catch (error) {
    console.error("Error fetching NFTs:", error);
  }
}

// Fetch details for each NFT
async function fetchNFTDetails(resourceAddress, nftId) {
  try {
    const response = await fetch("https://stokenet.radixdlt.com/state/non-fungible/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resource_address: resourceAddress,
        non_fungible_ids: [nftId],
      }),
    });

    const nftData = await response.json();
    const nftDetails = nftData.non_fungible_ids[0].data.programmatic_json.fields;
    console.log(nftDetails);

    // Display NFT details
    displayNFTDetails(nftDetails);
  } catch (error) {
    console.error("Error fetching NFT details:", error);
  }
}

// Display NFT details in the frontend
function displayNFTDetails(nftDetails) {
  const nftContainer = document.querySelector("#nft-container");

  const nftElement = document.createElement("div");
  nftElement.classList.add("nft");

  nftDetails.forEach((field) => {
    const fieldElement = document.createElement("p");
    fieldElement.textContent = `${field.field_name}: ${field.value}`;
    nftElement.appendChild(fieldElement);
  });

  nftContainer.appendChild(nftElement);
}

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

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

// ************ Fetch the user's account address ************
rdt.walletApi.setRequestData(DataRequestBuilder.accounts().atLeast(1));
// Subscribe to updates to the user's shared wallet data
rdt.walletApi.walletData$.subscribe((walletData) => {
  console.log("subscription wallet data: ", walletData);

  const nftContainer = document.querySelector("#nft-container");
  nftContainer.innerHTML = "";
  if (walletData.accounts.length === 0) {
    // User not logged in
    nftContainer.className = "grid grid-col-1 md:grid-row-2";
    nftContainer.innerHTML = "<p class='important-message'>You must be logged in to view your NFTs and put them up for sale.</p>";
    return;
  }

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

// NFT add Button

const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('addNFTModal');

openModalBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

// Función para cerrar el modal
closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
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

    if (nonFungibleResources.length === 0) {
      // No NFTs found for this account
      const nftContainer = document.querySelector("#nft-container");
      nftContainer.innerHTML += "<p>You don't have any NFT in your account.</p>";
    }

    for (const resource of nonFungibleResources) {
      const resourceAddress = resource.resource_address;
      const nftCount = resource.amount;
      console.log(resourceAddress);
      console.log(nftCount);

      // Fetch each NFT's data
      for (let i = 0; i < nftCount; i++) {
        const nftId = `#${i}#`;
        await fetchNFTDetails(accountAddress, resourceAddress, nftId);
      }
    }
  } catch (error) {
    console.error("Error fetching NFTs:", error);
  }
}

// Global list to store receipt addresses
let globalIdEscrowedNFTs = [];

// Fetch NFTs for a given account
async function fetchReceiptsForAccount(accountAddress) {
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

    const r = await gatewayApi.state.innerClient.stateEntityDetails({
      stateEntityDetailsRequest: {
        aggregation_level: "Vault",
        addresses: [accountAddress],
        opt_ins: {
          non_fungible_include_nfids: true,
        }
      },
    })

    console.log(r.items[0])

    const accountData = await response.json();
    console.log(accountData);

    // Extract non-fungible resources
    const nonFungibleResources = accountData.items[0].non_fungible_resources.items;
    for (const resource of nonFungibleResources) {
      const resourceAddress = resource.resource_address;
      if (resourceAddress == RECEIPT_ADDRESS) {  // Assuming RECEIPT_ADDRESS is predefined
        const nftCount = resource.amount;
        console.log(resourceAddress);
        console.log(nftCount);

        // Fetch each receipt's data
        for (let i = 0; i < nftCount; i++) {
          const nftId = `#${i}#`;
          await fetchReceiptData(resourceAddress, nftId);
        }
        break;
      }
    }
  } catch (error) {
    console.error("Error fetching Receipts:", error);
  }
}

// Fetch details for each NFT
async function fetchReceiptData(resourceAddress, nftId) {
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

    // Assuming the address field is stored under `nftDetails.address`
    const receiptAddress = nftDetails.address; // Adjust based on your actual JSON structure
    globalIdEscrowedNFTs.push(receiptAddress); // Add to the list

    console.log(`Stored receipt address: ${receiptAddress}`);

  } catch (error) {
    console.error("Error fetching NFT details:", error);
  }
}

// You can call fetchReceiptsForAccount and inspect the list after completion
fetchReceiptsForAccount('accountAddress').then(() => {
  console.log('All receipt addresses:', receiptAddresses);
});



// Fetch details for each NFT
async function fetchNFTDetails(accountAddress, resourceAddress, nftId) {
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
    displayNFTDetails(accountAddress, nftDetails);
  } catch (error) {
    console.error("Error fetching NFT details:", error);
  }
}

function displayNFTDetails(accountAddress, nftDetails) {
  const nftContainer = document.querySelector("#nft-container");
  nftContainer.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";

  // Create card element
  const nftCard = document.createElement("div");
  nftCard.className = "nft-card card-compact bg-base-100 shadow-lg w-[300px] shadow-secondary m-1";

  // Create figure element
  const figure = document.createElement("figure");
  figure.className = "relative";

  // Create image element
  const imgElement = document.createElement("img");
  if (nftDetails[2].value) {
    imgElement.src = nftDetails[2].value;
  } else {
    imgElement.src = "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg";
  }
  imgElement.alt = "NFT Image";
  imgElement.className = "h-60 min-w-full object-cover";

  // Append image to figure
  figure.appendChild(imgElement);

  // Create card body
  const cardBody = document.createElement("div");
  cardBody.className = "m-5 card-body space-y-3";

  // Create title
  const titleContainer = document.createElement("div");
  titleContainer.className = "flex items-center justify-center";

  const titleElement = document.createElement("p");
  titleElement.className = "text-xl p-0 m-0 font-semibold";
  titleElement.textContent = nftDetails[0].value;

  titleContainer.appendChild(titleElement);

  // Create description
  const descriptionContainer = document.createElement("div");
  descriptionContainer.className = "flex flex-col justify-center mt-1";

  const descriptionElement = document.createElement("p");
  descriptionElement.className = "my-0 text-lg";
  descriptionElement.textContent = nftDetails[1].value;

  descriptionContainer.appendChild(descriptionElement);

  // Create owner info
  const ownerContainer = document.createElement("div");
  ownerContainer.className = "flex space-x-3 mt-1 items-center";

  const ownerLabel = document.createElement("span");
  ownerLabel.className = "text-lg font-semibold";
  ownerLabel.textContent = "Owner : ";

  const ownerValue = document.createElement("span");
  ownerValue.className = "text-sm";
  ownerValue.textContent = `${accountAddress.slice(0, 10)}...${accountAddress.slice(-4)}`;

  ownerContainer.appendChild(ownerLabel);
  ownerContainer.appendChild(ownerValue);

  // Create actions container
  const actionsContainer = document.createElement("div");
  actionsContainer.className = "card-actions justify-end";

  const sellButton = document.createElement("button");
  sellButton.className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn";
  sellButton.textContent = "Sell";
  // Optionally add an event listener to handle button clicks
  sellButton.addEventListener("click", () => {
    alert(`Sell ${nftDetails[0].value}`);
  });

  actionsContainer.appendChild(sellButton);

  // Append all elements to the card body
  cardBody.appendChild(titleContainer);
  cardBody.appendChild(descriptionContainer);
  cardBody.appendChild(ownerContainer);
  cardBody.appendChild(actionsContainer);

  // Append figure and card body to the card
  nftCard.appendChild(figure);
  nftCard.appendChild(cardBody);

  // Append the card to the container
  nftContainer.appendChild(nftCard);
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

const formEl = document.querySelector("form");
const contBtn = document.getElementById("continue");
const myModal = new bootstrap.Modal("#myModal", {
  keyboard: true,
});

function validate({ target }) {
  const name = target.name;
  const value = target.value.trim();
  const nameHelp = document.getElementById("nameHelp");
  const emailHelp = document.getElementById("emailHelp");
  const contractHelp = document.getElementById("contractHelp");
  const button = document.getElementById("submit");

  const emailRegEx = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9_.]+?\.[a-zA-Z]{2,3}$/;
  const contractRegEx = /^[0-9]{1,8}\.[0-9]{3}/;

  switch (name) {
    case "name":
      value
        ? nameHelp.classList.add("d-none")
        : nameHelp.classList.remove("d-none");
      break;
    case "email":
      emailRegEx.test(value)
        ? emailHelp.classList.add("d-none")
        : emailHelp.classList.remove("d-none");
      break;
    case "contract":
      contractRegEx.test(value)
        ? contractHelp.classList.add("d-none")
        : contractHelp.classList.remove("d-none");
      break;
  }

  nameHelp.classList.contains("d-none") &&
  emailHelp.classList.contains("d-none") &&
  contractHelp.classList.contains("d-none")
    ? button.classList.remove("disabled")
    : button.classList.add("disabled");
}

function redirectToPowerform(e) {
  e.preventDefault();

  document.querySelector(
    ".modal-body"
  ).innerHTML = `You entered contract number <span>${document
    .getElementById("contract")
    .value.trim()}</span>. Click continue to proceed or cancel to change.`;

  myModal.show();
}

function loadDocuSign() {
  const url =
    "https://na2.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=f958bf94-58ae-42d3-a08d-3eb03a7e15c4&env=na2&acct=fb795f73-52cf-407c-b0dd-e4baedfa6d3e&v=2&EnvelopeField_Contract Number=" +
    document.getElementById("contract").value +
    "&Submitter_ContractNumber=" +
    document.getElementById("contract").value +
    "&Submitter_UserName=" +
    document.getElementById("name").value +
    "&Submitter_Email=" +
    document.getElementById("email").value;

    // Demo link: https://demo.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=481a2cf9-4a05-46ba-a1ac-1d68262e63a0&env=demo&acct=51c32f25-d3ad-4a25-9a89-82da1d99644d&v=2

  document.location.href = url;
}

formEl.addEventListener("keyup", validate);
formEl.addEventListener("submit", redirectToPowerform);
contBtn.addEventListener("click", loadDocuSign);

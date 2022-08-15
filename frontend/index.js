let apiBaseUrl = "http://127.0.0.1:8000";

//sets the api url in input field
document.querySelector("#api-url").value = apiBaseUrl;

const apiUrlInput = document.querySelector("#api-url");
apiUrlInput.addEventListener("input", (e) => {
  e.preventDefault();
  apiBaseUrl = document.querySelector("#api-url").value;
});

const paymentButton = document.querySelector(`#payment-btn`);
paymentButton && paymentButton.addEventListener("click", (e) => payment(e));

// handles payment
function makePayment(e) {
  e.preventDefault();
  paymentButton.innerHTML = "...loading";
  const card_number = document.querySelector("#card_number").value;
  const expiry_year = document.querySelector("#expiry_year").value;
  const expiry_month = document.querySelector("#expiry_month").value;
  const card_cvv = document.querySelector("#card_cvv").value;

  if (!expiry_month || !card_cvv || !card_number || !expiry_year) {
    paymentButton.innerHTML = "Payment";
    return setError("fill all fields");
  }
  const body = { card_number, expiry_year, expiry_month, card_cvv };
  const path = `${apiBaseUrl}/payment`;
  fetch(path, {
    method: "POST",
    body, mode:'no-cors'
  })
    .then((res) => res.json())
    .then((res) => {
      alert(JSON.stringify(res));
      paymentButton.innerHTML = "Payment";
    })
    .catch((err) => {
      console.log(err.message);
      setError(err.message ? err.message : JSON.stringify(error.details));
      paymentButton.innerHTML = "Payment";
    });
}


function setError(message) {
  const errorContainer = document.querySelector("#error-container");

  let errorDiv = `
    <div class="" id="error-message">
        ${
          typeof message !== "string"
            ? JSON.stringify(message, undefined, 2)
            : message
        }
    </div>
`;

  errorContainer.innerHTML = errorDiv;
}

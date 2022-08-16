let apiBaseUrl = "http://127.0.0.1:8000";

const paymentButton = document.querySelector(`#payment-btn`);
paymentButton && paymentButton.addEventListener("click", (e) => makePayment(e));

// handles payment
function makePayment(e) {
  e.preventDefault();
  paymentButton.innerHTML = "...loading";
  const card_number = document.querySelector("#card_number").value;
  const expiry_year = document.querySelector("#expiry_year").value;
  const expiry_month = document.querySelector("#expiry_month").value;
  const card_cvv = document.querySelector("#cvv").value;

  
  const data = { card_number, expiry_year, expiry_month, card_cvv };
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  };
  const path = `${apiBaseUrl}/payment`;
  console.log(options);
  fetch(path, options)
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

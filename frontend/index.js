let apiBaseUrl = "http://127.0.0.1:8000";

const paymentButton = document.querySelector(`#payment-btn`);
paymentButton && paymentButton.addEventListener("click", (e) => makePayment(e));

// handles payment
function makePayment(e) {
  e.preventDefault();
  // paymentButton.innerHTML = "...loading";
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
  fetch(path, options)
    .then((res) => res.json())
    .then((res) => {
      if (res.detail.error){
        setErrorRes(JSON.stringify(res.detail.error));
      } else if (res.detail.success){
        setSuccessRes(JSON.stringify(res.detail.success));
        paymentButton.innerHTML = "Processing...";
      }  
      // alert(JSON.stringify(res));
    })
    .catch((err) => {
      console.log(err.message);
      setErrorRes(err.message ? err.message : JSON.stringify(error.details));
      paymentButton.innerHTML = "Pay";
    });
}

const messageContainer = document.querySelector("#message-container");

function setErrorRes(message) {
  let errorDiv = `
    <div class="" id="error-message">
        ${
          typeof message !== "string"
            ? JSON.stringify(message, undefined, 2)
            : message
        }
    </div>
`;

  messageContainer.innerHTML = errorDiv;
}


function setSuccessRes(message) {
  let successDiv = `
    <div class="" id="success-message">
        ${
          typeof message !== "string"
            ? JSON.stringify(message, undefined, 2)
            : message
        }
    </div>
`;

  messageContainer.innerHTML = successDiv;
}
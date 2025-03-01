document.addEventListener("DOMContentLoaded", function() {
    let cartItems = [];
    
    document.getElementById("checkout-button").addEventListener("click", function() {
        fetch("/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cartItems })
        })
        .then(res => res.json())
        .then(data => {
            if (data.sessionId) {
                window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
            } else {
                console.error("Error:", data.error);
            }
        })
        .catch(error => console.error("Fetch Error:", error));
    });
});
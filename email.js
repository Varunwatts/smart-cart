(function () {
  emailjs.init("wnnDiQXa41dUmFeAj"); // Replace with your EmailJS User ID
})();

function sendThresholdExceededEmail(total, threshold) {
  const templateParams = {
    message: "🚨 Your Smart Cart has exceeded the threshold!",
    total: `₹${total}`,
    threshold: `₹${threshold}`
  };

  emailjs.send("service_ayoivyc", "template_z7ge24i", templateParams)
    .then((res) => {
      console.log("📤 Email sent!", res.status);
    })
    .catch((err) => {
      console.error("❌ Email failed", err);
    });
}

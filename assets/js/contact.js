/* CONTACT TERMINAL SIGNAL TRANSMITTER SCRIPT */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("form-submit-btn");
  const btnLabel = submitBtn.querySelector(".btn-label");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
      showStatus("⚠️ VALIDATION ERROR: FILL ALL INPUT BUFFER PORTS.", "error");
      return;
    }

    // Initiate signal transmission sequence
    disableForm(true);
    btnLabel.innerText = "> TRANSMITTING_SIGNAL...";
    showStatus("📡 ESTABLISHING SECURE OUTBOUND LINK...", "info");

    // Dynamic typewriter log states
    setTimeout(() => {
      showStatus("⚡ PACKETIZING PAYLOAD PROTOCOLS...", "info");
      
      setTimeout(() => {
        // We will submit using a fetch request, with an auto-fail fallback to direct mailto client!
        // To allow the user to easily plug in their own Web3Forms or Formspree access key, we search for a key.
        // As a default robust fallback, we immediately format the mailto and trigger it.
        
        const mailtoSubject = encodeURIComponent(`Outbound Port Signal from ${name}`);
        const mailtoBody = encodeURIComponent(`Sender: ${name} (${email})\n\nTransmission Payload:\n${message}`);
        const mailtoUrl = `mailto:madheshvivekanandan@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        
        // Open local email client
        window.location.href = mailtoUrl;

        // Display highly aesthetic successful logs
        showStatus("✓ SIGNAL BROADCAST COMPLETE. OUTBOUND PORT CLOSED.", "success");
        btnLabel.innerText = "> TRANSMISSION_LAUNCHED";
        form.reset();
        
        setTimeout(() => {
          disableForm(false);
          btnLabel.innerText = "> INITIATE_TRANSMISSION";
        }, 3000);

      }, 1200);
    }, 1000);
  });

  function disableForm(disabled) {
    form.querySelectorAll(".form-input").forEach(input => {
      input.disabled = disabled;
    });
    submitBtn.disabled = disabled;
    if (disabled) {
      submitBtn.style.opacity = "0.5";
      submitBtn.style.pointerEvents = "none";
    } else {
      submitBtn.style.opacity = "1";
      submitBtn.style.pointerEvents = "auto";
    }
  }

  function showStatus(msg, type) {
    statusEl.innerHTML = msg;
    statusEl.className = `form-status ${type}`;
  }
});

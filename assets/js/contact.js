/* CONTACT TERMINAL SIGNAL TRANSMITTER SCRIPT
 * Delivers messages via Web3Forms (server-side email relay) so submissions
 * reach the owner's inbox with no dependency on the visitor's email client.
 * Falls back to a mailto: link only if the network request fails. */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("form-submit-btn");
  const btnLabel = submitBtn.querySelector(".btn-label");

  const ACCESS_KEY = (window.SITE_CONFIG && window.SITE_CONFIG.WEB3FORMS_ACCESS_KEY) || "";
  const OWNER_EMAIL = "madheshvivekanandan@gmail.com";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
      showStatus("⚠️ VALIDATION ERROR: FILL ALL INPUT BUFFER PORTS.", "error");
      return;
    }

    // Initiate signal transmission sequence (aesthetic terminal logs)
    disableForm(true);
    btnLabel.innerText = "> TRANSMITTING_SIGNAL...";
    showStatus("📡 ESTABLISHING SECURE OUTBOUND LINK...", "info");
    await delay(900);
    showStatus("⚡ PACKETIZING PAYLOAD PROTOCOLS...", "info");

    // Distinguishes "network never reached the relay" from "relay answered but
    // rejected the payload" (e.g. rotated/disabled access key) for accurate status copy.
    let relayRejected = false;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Outbound Port Signal from ${name}`,
          from_name: name,
          name,
          email,
          message,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        relayRejected = true;
        throw new Error(data.message || "Transmission rejected by relay node.");
      }

      // Delivered to the owner's inbox — no further action by the visitor.
      showStatus("✓ SIGNAL BROADCAST COMPLETE. PAYLOAD DELIVERED TO CORE.", "success");
      btnLabel.innerText = "> TRANSMISSION_LAUNCHED";
      form.reset();
    } catch (err) {
      // Either way the visitor's mail client still delivers the message.
      showStatus(
        relayRejected
          ? "⚠️ RELAY REJECTED PAYLOAD — REROUTING VIA LOCAL MAIL CLIENT..."
          : "⚠️ RELAY UNREACHABLE — REROUTING VIA LOCAL MAIL CLIENT...",
        "error"
      );
      const subject = encodeURIComponent(`Outbound Port Signal from ${name}`);
      const body = encodeURIComponent(`Sender: ${name} (${email})\n\nTransmission Payload:\n${message}`);
      window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
      btnLabel.innerText = "> FALLBACK_CHANNEL_OPENED";
    } finally {
      setTimeout(() => {
        disableForm(false);
        btnLabel.innerText = "> INITIATE_TRANSMISSION";
      }, 3000);
    }
  });

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function disableForm(disabled) {
    form.querySelectorAll(".form-input").forEach((input) => {
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

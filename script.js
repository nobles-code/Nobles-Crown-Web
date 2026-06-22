(function () {
  "use strict";

  var WHATSAPP_NUMBER = "254111627474";
  var CONTACT_EMAIL = "solution@noblescrown.co.ke";

  var form = document.getElementById("leadForm");
  var note = document.getElementById("formNote");
  if (!form || !note) return;

  var lastChannel = "whatsapp";

  form.querySelectorAll('button[type="submit"]').forEach(function (btn) {
    btn.addEventListener("click", function () {
      lastChannel = btn.getAttribute("data-channel") || "whatsapp";
    });
  });

  function setNote(message, isError) {
    note.textContent = message;
    note.style.color = isError ? "#D98C5F" : "var(--brass)";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var reach = form.reach.value.trim();
    var brief = form.brief.value.trim();

    if (!name || !reach || !brief) {
      setNote("Fill in all three fields — we need a way to reach you back.", true);
      return;
    }

    var bodyText =
      "New project inquiry\n" +
      "Name: " + name + "\n" +
      "Reach: " + reach + "\n" +
      "Building: " + brief;

    if (lastChannel === "email") {
      var subject = encodeURIComponent("Project inquiry — " + name);
      var body = encodeURIComponent(bodyText);
      window.location.href =
        "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
      setNote("Opening your email client…", false);
    } else {
      var waText = encodeURIComponent(
        "Hi Nobles Crown, I'm " + name + ". " + brief +
        " You can reach me at " + reach + "."
      );
      window.open(
        "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + waText,
        "_blank",
        "noopener"
      );
      setNote("Opening WhatsApp…", false);
    }
  });
})();
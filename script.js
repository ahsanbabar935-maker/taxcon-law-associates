"use strict";

// TAXCON Law Associates - Website interactions

document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.getElementById("languageToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const contactForm = document.getElementById("contactForm");

  // Automatically display the current year in the footer.
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // Default language.
  let currentLanguage = "en";

  // Change website language between English and Urdu.
  function setLanguage(language) {
    currentLanguage = language;

    document.documentElement.lang =
      language === "ur" ? "ur" : "en";

    document.documentElement.dir =
      language === "ur" ? "rtl" : "ltr";

    document.body.dir =
      language === "ur" ? "rtl" : "ltr";

    // Update text on all elements with language attributes.
    document.querySelectorAll("[data-en][data-ur]").forEach(function (element) {
      const translation =
        language === "ur"
          ? element.dataset.ur
          : element.dataset.en;

      // Preserve HTML markup such as line breaks in the hero heading.
      if (element.tagName === "OPTION") {
        element.textContent = translation;
      } else {
        element.innerHTML = translation;
      }
    });

    // Update placeholders in input fields and textareas.
    document.querySelectorAll("[data-en-placeholder][data-ur-placeholder]")
      .forEach(function (element) {
        element.placeholder =
          language === "ur"
            ? element.dataset.urPlaceholder
            : element.dataset.enPlaceholder;
      });

    // Show the language the user can switch TO.
    languageToggle.textContent =
      language === "ur" ? "English" : "اردو";

    // Update navigation accessibility text.
    menuToggle.setAttribute(
      "aria-label",
      language === "ur" ? "مینو کھولیں" : "Open navigation"
    );

    // Close the mobile menu after changing language.
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  languageToggle.addEventListener("click", function () {
    setLanguage(currentLanguage === "en" ? "ur" : "en");
  });

  // Open and close the mobile navigation menu.
  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  // Close the mobile menu when a navigation link is clicked.
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Prepare an inquiry and open WhatsApp.
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const name =
      document.getElementById("clientName").value.trim();

    const phone =
      document.getElementById("clientPhone").value.trim();

    const service =
      document.getElementById("clientService").value;

    const message =
      document.getElementById("clientMessage").value.trim();

    if (!name || !phone || !service) {
      return;
    }

    // Keep the WhatsApp message readable in either language.
    const inquiry =
      currentLanguage === "ur"
        ? [
            "السلام علیکم TAXCON Law Associates،",
            "",
            "مجھے آپ کی سروس کے بارے میں معلومات چاہیے۔",
            "",
            "نام: " + name,
            "فون نمبر: " + phone,
            "سروس: " + service,
            "تفصیلات: " + (message || "مزید بات کرنا چاہتا/چاہتی ہوں۔")
          ].join("\n")
        : [
            "Hello TAXCON Law Associates,",
            "",
            "I would like to enquire about your services.",
            "",
            "Name: " + name,
            "Phone: " + phone,
            "Required service: " + service,
            "Details: " + (message || "Please contact me to discuss.")
          ].join("\n");

    const whatsappURL =
      "https://wa.me/923140064509?text=" +
      encodeURIComponent(inquiry);

    // Open WhatsApp in a new tab/window.
    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    // Fallback if the browser blocks the new window.
    if (!whatsappWindow) {
      window.location.href = whatsappURL;
    }
  });
});
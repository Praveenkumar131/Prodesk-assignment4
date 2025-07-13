const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const summary = document.getElementById("summary");
const form = document.getElementById("form");
const circles = document.querySelectorAll(".ind");

let currentStep = 0;

function showStep(step) {
  steps.forEach((s, index) => {
    s.classList.toggle("active", index === step);
  });

  circles.forEach((circle, i) => {
    circle.classList.toggle("active", i === step);
  });
}

nextBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (currentStep === 0) {
      const inputs = steps[0].querySelectorAll("input");
      for (let input of inputs) {
        if (!input.value) {
          alert("Please fill out all fields.");
          return;
        }
      }
    }

    if (currentStep === 2) {
      const name = form.name.value;
      const email = form.email.value;
      const phone = form.phone.value;
      const plan = form.plan.value;
      const addons = [...form.querySelectorAll("input[name='addon']:checked")].map(el => el.value);

      summary.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Add-ons:</strong> ${addons.join(", ") || "None"}</p>
      `;
    }

    currentStep++;
    showStep(currentStep);
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentStep--;
    showStep(currentStep);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Form submitted successfully!");
  form.reset();
  currentStep = 0;
  showStep(currentStep);
});

showStep(currentStep);

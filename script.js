const subjectCount = document.getElementById("subjectCount");
const subjectsContainer = document.getElementById("subjects");
const marksForm = document.getElementById("marksForm");
const result = document.getElementById("result");
const resetButton = document.getElementById("resetButton");

function renderSubjects() {
  const count = Number(subjectCount.value);
  subjectsContainer.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const wrapper = document.createElement("div");
    wrapper.className = "subject-field";

    const label = document.createElement("label");
    label.htmlFor = `subject${i}`;
    label.textContent = `Subject ${i} marks (0–100)`;

    const input = document.createElement("input");
    input.id = `subject${i}`;
    input.name = `subject${i}`;
    input.type = "number";
    input.min = "0";
    input.max = "100";
    input.step = "1";
    input.placeholder = "Enter marks";
    input.required = true;

    wrapper.append(label, input);
    subjectsContainer.appendChild(wrapper);
  }
}

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  if (percentage >= 35) return "E";
  return "F";
}

subjectCount.addEventListener("change", renderSubjects);

marksForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const inputs = [...subjectsContainer.querySelectorAll("input")];
  const marks = inputs.map((input) => Number(input.value));

  if (!name) {
    alert("Please enter the student's name.");
    return;
  }

  const invalid = inputs.some((input) =>
    input.value.trim() === "" ||
    !Number.isFinite(Number(input.value)) ||
    Number(input.value) < 0 ||
    Number(input.value) > 100
  );

  if (invalid) {
    alert("Enter a valid mark from 0 to 100 for every subject.");
    return;
  }

  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const maximum = marks.length * 100;
  const percentage = (total / maximum) * 100;
  const passed = marks.every((mark) => mark >= 35);

  document.getElementById("resultName").textContent = `Student: ${name}`;
  document.getElementById("totalMarks").textContent = `${total} / ${maximum}`;
  document.getElementById("percentage").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("grade").textContent = getGrade(percentage);

  const status = document.getElementById("status");
  status.textContent = passed ? "✅ Result: PASS" : "❌ Result: FAIL (below 35 in at least one subject)";
  status.className = `status ${passed ? "pass" : "fail"}`;

  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

resetButton.addEventListener("click", () => {
  marksForm.reset();
  subjectCount.value = "5";
  renderSubjects();
  result.classList.add("hidden");
  document.getElementById("studentName").focus();
});

renderSubjects();

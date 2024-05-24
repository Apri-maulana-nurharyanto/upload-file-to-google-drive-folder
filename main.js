const form = document.getElementById("form");
const popup = document.getElementById("popup");
const btnSubmit = document.getElementById("btn-submit");

function showPopup() {
  popup.style.display = "block";
  form.style.display = "none";
}

function hidePopup() {
  location.reload();
  popup.style.display = "none";
}

function toggleSubmitButton(isLoading) {
  if (isLoading) {
    btnSubmit.textContent = "Loading...";
    btnSubmit.disabled = true;
  } else {
    btnSubmit.textContent = "Kirim";
    btnSubmit.disabled = false;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  toggleSubmitButton(true)
  const file = form.file.files[0];
  const fr = new FileReader();
  fr.readAsArrayBuffer(file);
  fr.onload = (f) => {
    const url =
      "https://script.google.com/macros/s/AKfycbzpyBQVmsdGVR4KAPvaKrjuDKII_1gaX9PYpgrTmJ7SvqEgyWuDSE9aFSw4uQbVlwMK/exec"; // <--- URL Web appscript setelah kalian deploy si appscriptnya

    const qs = new URLSearchParams({
      filename: form.filename.value || file.name,
      mimeType: file.type,
    });
    fetch(`${url}?${qs}`, {
      method: "POST",
      body: JSON.stringify([...new Int8Array(f.target.result)]),
    })
      .then((res) => res.json())
      .then((e) => {
        console.log(e); //appscript Response
      }) // response appscript
      .catch((error) => {
        console.log(error);
        toggleSubmitButton(false);
        showPopup();
      });
  };
});

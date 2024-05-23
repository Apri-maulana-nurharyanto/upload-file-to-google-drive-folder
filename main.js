const form = document.getElementById("form");
var imgSource = document.getElementById("showImg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = form.file.files[0];
  const fr = new FileReader();
  fr.readAsArrayBuffer(file);
  fr.onload = (f) => {
    const url = 
      "https://script.google.com/macros/s/AKfycbydCKesNT1DjQ7fWV56D6eRGew1UKGQI4erUvT7ypGYNnmWmfkJNSefwsrxlJCv7d70/exec"; // <--- URL Web appscript setelah kalian deploy si appscriptnya

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
        document.getElementById("showImg").src =
          "https://drive.google.com/thumbnail?id=" + e.fileId + "&sz=w1000"; //ini untuk pasang img src nya
      }) // response appscript
      .catch((err) => console.log(err));
  };
});

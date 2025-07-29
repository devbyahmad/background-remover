const fileInput = document.getElementById('filepicker');
const innerImage = document.querySelector('.inner-upload-image');
const inputImg = document.getElementById('input-image');
const uploadBtn = document.getElementById('upload-btn');
const downloadBtn = document.getElementById('download-btn');
const uploadIcon = document.querySelector('.upload-icon');
const uploadSpan = document.querySelector('.upload-span');

let image = null;
let resultURL = null;

innerImage.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  image = fileInput.files[0];
  if (!image) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    inputImg.src = e.target.result;
    inputImg.classList.add('show');
    uploadIcon.style.display = 'none';
    uploadSpan.style.display = 'none';
    downloadBtn.style.display = 'none';
  };
  reader.readAsDataURL(image);
});

uploadBtn.addEventListener('click', () => {
  if (!image) return alert("Please upload an image first.");

  uploadBtn.disabled = true;
  uploadBtn.textContent = "Removing...";

  const formData = new FormData();
  formData.append("image_file", image);
  formData.append("size", "auto");

  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": "YV6SweiePeB8Tfkvor34HS8r"  // Replace with your valid API key
    },
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Remove.bg API error");
      return res.blob();
    })
    .then(blob => {
      resultURL = URL.createObjectURL(blob);
      inputImg.src = resultURL;
      inputImg.classList.add('show');
      downloadBtn.href = resultURL;
      downloadBtn.style.display = 'inline-block';
    })
    .catch(err => {
      alert("Error: " + err.message);
    })
    .finally(() => {
      uploadBtn.disabled = false;
      uploadBtn.textContent = "Remove";
    });
});

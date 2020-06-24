const test = document.getElementById("test");
const fileInput = document.getElementById("file-input");

test.innerHTML += "test";

test.addEventListener("click", () => console.log("test"));

function displayFile() {
  const reader = new FileReader(
    "C:/Users/Phillip/Desktop/test-folder/text1.txt"
  );

  console.log(reader);
}

displayFile();

fileInput.addEventListener("change", (data) => console.log(data));

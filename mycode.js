// ************* create constants and vars ********************
const myform = document.getElementById("myForm");
const gender = ["male", "female", "other"];
var userFormData = new Object();
var formData = new FormData();
const phoneError = document.getElementById("phoneError");
var phoneIsValid = false;

// ************* phone number basic validation ******************
myform.phone.addEventListener("input", (event) => {
  let value = myform.phone.value;

  // Remove non-numeric characters
  value = value.replace(/\D/g, "");

  // Format the number as (123) 456-7890
  if (value.length > 3 && value.length <= 6) {
    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
  } else if (value.length > 6) {
    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
  } else if (value.length > 3) {
    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
  }

  myform.phone.value = value;

  // Basic validation for phone number length
  if (value.length >= 10) {
    phoneError.style.visibility = "hidden";
    phoneIsValid = true;
  } else {
    phoneError.style.visibility = "visible";
    phoneError.textContent = "Phone number must be 10 digits long";
  }
});

// *************** image file validation ********************
function imgfileValidation() {
  var filePath = myform.imgfile.value;

  // Allowing file type
  var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  if (!allowedExtensions.exec(filePath)) {
    alert("Invalid file type");
    myform.imgfile.value = "";
    return false;
    // } else {
    //   // Image preview
    //   if (myform.imgfile.files && myform.imgfile.files[0]) {
    //     var reader = new FileReader();
    //     reader.onload = function (e) {
    //       document.getElementById("imagePreview").innerHTML =
    //         '<img src="' + e.target.result + '"/>';
    //     };

    //     reader.readAsDataURL(myform.imgfile.files[0]);
    //   }
  }
}

// *************** doc file validation ********************
function pdffileValidation() {
  var filePath = myform.docfile.value;

  // Allowing file type
  var allowedExtensions =
    /(\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd)$/i;

  if (!allowedExtensions.exec(filePath)) {
    alert("Invalid file type");
    myform.docfile.value = "";
    return false;
  }
}

// ************   checking fields and sending files   *********************
myform.submt.addEventListener("click", (event) => {
  event.preventDefault();
  const emailvalidation = () => {
    return String(myform.email.value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  if (emailvalidation() === null) {
    alert("please enter correct email!");
  } else if (myform.name.value === "") {
    alert("Please fill the name field!");
  } else if (myform.docfile.files[0] === undefined) {
    alert("please select and send your CV!");
  } else if (phoneIsValid) {
    userFormData.name = myform.name.value;
    userFormData.email = myform.email.value;
    userFormData.tel = myform.phone.value;
    userFormData.gender = gender[myform.gender.selectedIndex];
    userFormData.subSelect = myform.subscribeYes.checked;

    // ************* append form inputs into the formData object
    formData.append("user", JSON.stringify(userFormData));
    formData.append("img", myform.imgfile.files[0]);
    formData.append("cv", myform.docfile.files[0]);

    // ******** creating request and sending formData to the php file on the server*********
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "sendmail.php", true);
    xhr.onload = () => {
      if (xhr.status !== 200) {
        console.error("Error submitting form:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Error submitting form:", xhr.statusText);
    };
    xhr.send(formData);
  }
  myform.reset();
});

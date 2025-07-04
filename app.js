const API = "https://686779e0e3fefb261edecfde.mockapi.io/users/users";
const Add = document.querySelector("#addUser");
const lavozimFilter = document.querySelector("#lavozimFilter");
const manzilFilter = document.querySelector("#manzilFilter");
const dataArea = document.querySelector(".dataArea");
const userDiv = document.querySelector(".userDiv");
const closeModal = document.getElementById("closeModal");
const closeModal2 = document.getElementById("closeModal2");
const inputModal = document.querySelector(".input-modal");
const ism = document.getElementById("ism");
const familiya = document.getElementById("familiya");
const manzil = document.getElementById("manzil");
const birthday = document.getElementById("birthday");
const lavozim = document.getElementById("profession");
const lavozimTuri = document.getElementById("degree");
const salary = document.getElementById("salary");
const Oilalimi = document.getElementById("isMarried");
const addFn = document.getElementById("addFn");

const modalInnerForm = document.querySelector(".input-modal form");

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
  async function fetchUsers(params) {
    try {
      const data = await fetch(API);
      const users = await data.json();
      disPlayUsers(users);
    } catch (error) {
      console.log(
        "Kechirasiz ma'lumotlarni yuklashda xatolik yuz berdi",
        error
      );
    }
  }
  function disPlayUsers(data) {
    dataArea.innerHTML = "";
    if (data.length === 0) {
      dataArea.innerHTML = `
    <h1 class=" text-4xl text-center opacity-60">
    Hali foydalanuchi qo'shilmagan
    </h1>
    `;
    }

    data.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.setAttribute("data-id", `${user.id}`);
      userDiv.innerHTML = `
  <div class="flex w-[90%] m-auto px-4 py-2 bg-white rounded-xl shadow border mb-2 items-center justify-between">
    <ul class="userInforms flex flex-1 justify-between gap-4 text-[16px] w-[80%]">
      <li class="font-bold w-8 t
      ext-center">${user.id}</li>
      <li class="w-24 truncate">${user.name}</li>
      <li class="w-28 truncate">${user.lastName}</li>
      <li class="w-28 truncate">${user.address || ""}</li>
      <li class="w-28 truncate">${user.birthday || ""}</li>
      <li class="w-24 truncate">${user.profession}</li>
      <li class="w-20 truncate">${user.degree}</li>
      <li class="w-20 truncate">${user.salary}</li>
      <li class="w-16 text-center">${user.isMarried ? "HA" : "YO'Q"}</li>
    </ul>
    <div class="flex gap-2 min-w-[150px] justify-end">
      <button class="edit px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold border border-blue-700 transition">EDIT</button>
      <button class="DELETE px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 font-semibold border border-red-700 transition">DELETE</button>
    </div>
  </div>
      `;
      dataArea.appendChild(userDiv);
    });
  }

  //   modal ochilib yopilishi uchun
  Add.addEventListener("click", (event) => {
    event.preventDefault();
    if (inputModal.classList.contains("invisible")) {
      inputModal.classList.remove("invisible");
    }
  });

  inputModal.addEventListener("click", (e) => {
    if (e.target === inputModal) {
      inputModal.classList.add("invisible");
    }
  });
  inputModal.querySelector("div").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  closeModal.addEventListener("click", (event) => {
    event.preventDefault();
    if (!inputModal.classList.contains("invisible")) {
      inputModal.classList.add("invisible");
    }
  });

  closeModal2.addEventListener("click", (event) => {
    event.preventDefault();
    if (!inputModal.classList.contains("invisible")) {
      inputModal.classList.add("invisible");
    }
  });
  //   modal ochilib yopilishi uchun

  modalInnerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const editId = inputModal.dataset.editId;
    const ismValue = ism.value.trim();
    const familiyaValue = familiya.value.trim();
    const manzilValue = manzil.value.trim();
    const birthdayValue = birthday.value.trim();
    const lavozimValue = lavozim.value.trim();
    const lavozimTuriValue = lavozimTuri.value.trim();
    const salaryValue = salary.value.trim();
    const OilalimiValue = Oilalimi.checked;
    const data = {
      name: ismValue,
      lastName: familiyaValue,
      address: manzilValue,
      profession: lavozimTuriValue,
      degree: lavozimValue,
      salary: salaryValue,
      isMarried: OilalimiValue,
      birthday: birthdayValue,
    };

    if (editId) {
      // Edit rejimi
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      delete inputModal.dataset.editId; // Edit rejimini tozalash
    } else {
      // Yangi user qo'shish
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    inputModal.classList.add("invisible");
    fetchUsers();
  });

  //   create userni ishga tushiradi
  async function createUser() {
    const ismValue = ism.value.trim();
    const familiyaValue = familiya.value.trim();
    const manzilValue = manzil.value.trim();
    const birthdayValue = birthday.value.trim();
    const lavozimValue = lavozim.value.trim();
    const lavozimTuriValue = lavozimTuri.value.trim();
    const salaryValue = salary.value.trim();
    const OilalimiValue = Oilalimi.checked;
    const data = {
      name: ismValue,
      lastName: familiyaValue,
      adress: manzilValue,
      profession: lavozimTuriValue,
      degree: lavozimValue,
      salary: salaryValue,
      isMarried: OilalimiValue,
      birthday: birthdayValue,
    };
    // userni create qiladi
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
  //  deleteUser

  dataArea.addEventListener("click", (e) => {
    if (e.target.classList.contains("DELETE")) {
      const DivID = e.target.closest("[data-id]");
      if (DivID) {
        DivID.remove();
        deleteUser(DivID.dataset.id);
      }
    }
  });
  async function deleteUser(id) {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    }).catch(() => console.log("Foydalanuvchini o'chirishda muammo"));
    fetchUsers();
  }
  // edit qilish
  dataArea.addEventListener("click", async (e) => {
    if (e.target.classList.contains("edit")) {
      const DivID = e.target.closest("[data-id]");
      if (DivID) {
        const userId = DivID.dataset.id;
        const response = await fetch(`${API}/${userId}`);
        const user = await response.json();

        ism.value = user.name || "";
        familiya.value = user.lastName || "";
        manzil.value = user.address || "";
        birthday.value = user.birthday || "";
        lavozim.value = user.degree || "";
        lavozimTuri.value = user.profession || "";
        salary.value = user.salary || "";
        Oilalimi.checked = !!user.isMarried;

        inputModal.classList.remove("invisible");

        inputModal.dataset.editId = userId;
      }
    }
  });
});

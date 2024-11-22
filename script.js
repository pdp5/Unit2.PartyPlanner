API_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2410-FTB-ET-WEB-FT/events";

let events = [];

const party_List = document.getElementById("party-list");
const name = document.getElementById("name");
const description = document.getElementById("description");
const date = document.getElementById("date");
const address = document.getElementById("location");
const submit_btn = document.getElementById("submit-btn");
submit_btn.addEventListener("click", addEvent);

async function getEvents() {
  try {
    const response = await fetch(API_URL);
    data = await response.json();
    events = data.data;
    console.log("events: ", events);
    display_List();
  } catch (error) {
    console.error(error);
  }
}

function display_List() {
  party_List.innerHTML = "";
  events.forEach((event) => {
    const div = document.createElement("div");
    div.style.border = "solid 5px black";
    div.style.marginTop = "10px";
    div.style.marginBottom = "10px";
    div.style.padding = "10px";
    div.style.width = "50%";
    // div.style.display = "flex";
    // div.style.flexDirection = "column";
    div.style.justifySelf = "center";

    delete_btn = document.createElement("button");
    delete_btn.textContent = "Delete";
    delete_btn.style.fontSize = "20px";
    delete_btn.style.marginBottom = "10px";
    delete_btn.addEventListener("click", () => delete_event(event.id));

    const event_name = document.createElement("div");
    event_name.textContent = `Name: ${event.name}`;

    const event_description = document.createElement("div");
    event_description.textContent = `Description: ${event.description}`;

    const event_date = document.createElement("div");

    const event_date_obj = new Date(event.date);
    const display_date = event_date_obj.toDateString();
    const display_time = event_date_obj.toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    event_date.textContent = `Date: ${display_date}, ${display_time}`;

    const event_location = document.createElement("div");
    event_location.textContent = `Location: ${event.location}`;

    // console.log(event_name);
    div.appendChild(delete_btn);
    div.appendChild(event_name);
    div.appendChild(event_description);
    div.appendChild(event_date);
    div.appendChild(event_location);
    party_List.appendChild(div);
  });
}
getEvents();

async function addEvent(event) {
  event.preventDefault();
  //   events.push({
  //     id: events.length,
  //     name: name.value,
  //     description: description.value,
  //     date: date.value,
  //     location: address.value,
  //   });
  //   console.log("event: ", events);
  //   display_List();

  let date_Object = new Date(date.value);

  const format_date = date_Object.toISOString();

  //   const formatTime = date_Object.toLocaleTimeString("en-us", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   });
  //   const format_date = date_Object.toISOString().split("T")[0];

  //   const combine_date_time = `${format_date}, ${formatTime}`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        description: description.value,
        date: format_date,
        location: address.value,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add event: ${response.statusText}`);
    }
    await getEvents();
    name.value = "";
    description.value = "";
    date.value = "";
    address.value = "";
  } catch (error) {
    console.error(error);
  }
}
async function delete_event(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error("Failed to delete event");
    }
    await getEvents();
  } catch (error) {
    console.error(error);
  }
}

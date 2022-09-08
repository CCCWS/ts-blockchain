import axios from "axios";
import { google } from "google-maps";

const form = document.querySelector("form")! as HTMLFormElement;
const address = document.querySelector("#address")! as HTMLInputElement;
const GOOGLE_API = "AIzaSyAiyvfd78O-hm_-rRm391N8R-upWaHeZpE";

const searchAddressHandler = async (e: Event) => {
  e.preventDefault();
  const userAddress = address.value;
  const GOOGLE_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    userAddress
  )}&key=${GOOGLE_API}`;
  // console.log(encodeURI(userAddress));

  //Google api 전송
  try {
    const res = await axios.get(GOOGLE_URL);
    if (res.status === 200) {
      if (res.data.status === "ZERO_RESULTS") {
        alert("검색 결과 없음");
        console.log(res.data);
      }
      if (res.data.status === "OK") {
        console.log(res.data.results);
        const coordinates = res.data.results[0].geometry.location; //좌표

        const map = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: coordinates,
            zoom: 16,
          }
        );

        new google.maps.Marker({
          position: coordinates,
          map: map,
        });
      }
    }
  } catch (error) {
    throw new Error("error");
  }
};

form.addEventListener("submit", searchAddressHandler);

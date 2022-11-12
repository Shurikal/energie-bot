<script setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import {
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/vue/24/solid";

const chat = ref([]);
const questionIndex = ref(0);
const loading = ref(false);

// to add messages to the chat from questions and inputs from the user
const addChat = (body, type) => {
  chat.value.push({
    body,
    type,
  });
};

// the questions that the bot will ask
const questions = ref([
  {
    text: "Was möchtest du verbessern?",
    type: "choice",
    options: [
      {
        text: "Energie",
        value: "energy",
      },
      {
        text: "Heizung",
        value: "heat",
      },
    ],
  },
  {
    text: "Was ist dir wichtig?",
    type: "choice",
    options: [
      {
        text: "Preis",
        value: "price",
      },
      {
        text: "Zukunftsorientierung",
        value: "future",
      },
      {
        text: "Geringe Wartungskosten",
        value: "maintenance",
      },
    ],
  },
  {
    text: "Was für eine Heizung ist installiert?",
    type: "choice",
    options: [
      {
        text: "Öl",
        value: "oil",
      },
      {
        text: "Gas",
        value: "gas",
      },
      {
        text: "Andere",
        value: "other",
      },
    ],
  },
  {
    text: "Um welches Objekt handelt es sich?",
    type: "address",
  },
  {
    text: "End",
    type: "end",
  },
]);

// initial chat message with question from "bot"
const initChat = () => {
  addChat(
    "Hallo, kann ich dir helfen schnell und einfach Empfehlungen zu geben?",
    "bot"
  );
  addChat(questions.value[questionIndex.value].text, "bot");
};

initChat();

// we need to save the answers so we can make suggestions
const answers = ref([]);

// adds one answer to the answers array and moves to the next question if there is one
const addAnswer = async (answer) => {
  answers.value.push(answer);
  questionIndex.value++;
  addChat(answer.text, "user");

  await new Promise((resolve) => setTimeout(resolve, 300));

  if (questions.value[questionIndex.value].type === "end") {
    return;
  }

  addChat(questions.value[questionIndex.value].text, "bot");
};

// get the address that has been input by the user
const address = ref("");

const getLv95Coords = async (address) => {
  const response = await fetch(
    `https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${address}&type=locations&origins=address&limit=1&sr=2056`
  );
  const data = await response.json();

  try {
    return data.results[0].attrs;
  } catch (error) {
    return null;
  }
};

const getHeatingInfo = async (lat, lon) => {
  const dist = 1;

  const url = `https://daten.stadt.sg.ch/api/records/1.0/search/?dataset=warmeversorgung&q=&facet=waermevers&geofilter.distance=${lat}%2C${lon}%2C${dist}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const getSolarInfo = async (x, y) => {
  const url = `https://api3.geo.admin.ch/rest/services/all/MapServer/identify?geometry=${y},${x}&geometryFormat=geojson&geometryType=esriGeometryPoint&imageDisplay=1680,388,96&lang=en&layers=all:ch.bfe.solarenergie-eignung-daecher&limit=10&mapExtent=2745356.382965297,1254042.6972188372,2746005.609812927,1254192.6377050756&returnGeometry=true&sr=2056&tolerance=20`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// in the solar info we get an array of objects with the solar potential for each roof
// we need the highest value of all roofs
const getHighestSolarClass = (solarInfo) => {
  let highestClass = 0;
  let featureId = null;
  let classText = null;
  solarInfo.results.forEach((result) => {
    if (result.properties.klasse > highestClass) {
      highestClass = result.properties.klasse;
      featureId = result.featureId;
      classText = result.properties.klasse_text;
    }
  });

  // split classText at ## and get first one
  classText = classText.split("##")[0];
  return { highestClass, featureId, classText };
};

const runSuggestionRequests = async () => {
  loading.value = true;

  const coords = await getLv95Coords(address.value);
  console.log("coords", coords);

  if (!coords) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    addChat(
      "Ich konnte die Adresse nicht finden. Bitte versuche es erneut.",
      "bot"
    );
    loading.value = false;
    return;
  }

  addAnswer({
    text: address.value,
    value: address.value,
  });

  const heatingInfo = await getHeatingInfo(coords.lat, coords.lon);
  console.log("heatingInfo", heatingInfo);
  const solarInfo = await getSolarInfo(coords.x, coords.y);
  console.log("solarInfo", solarInfo);

  const highestSolarClass = getHighestSolarClass(solarInfo);
  console.log("highestSolarClass", highestSolarClass);

  loading.value = false;

  await new Promise((resolve) => setTimeout(resolve, 300));
  loading.value = false;

  addChat("Folgende Informationen konnte ich zu deinem Objekt finden:", "bot");

  // SOLAR
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (highestSolarClass.highestClass >= 3) {
    addChat(
      `Ich habe eine gute Nachricht für dich. Dein Dach ist für eine Solaranlage geeignet. Das Dach hat die Note "${highestSolarClass.classText}".`,
      "bot"
    );

    await new Promise((resolve) => setTimeout(resolve, 300));
    addChat(
      `Hier hast du noch eine Darstellung davon: https://www.uvek-gis.admin.ch/BFE/sonnendach/?featureId=${highestSolarClass.featureId}&lang=de`,
      "bot"
    );
  } else {
    addChat(
      "Leider ist die Dachfläche nicht für eine Solaranlage geeignet.",
      "bot"
    );
  }
  // SOLAR END

  // HEATING TYPE (Fernwärme)
  if (heatingInfo.nhits > 0) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    addChat(
      "Ich habe auch Informationen über die Wärmeversorgung deines Objekts gefunden.",
      "bot"
    );

    // maybe there are more than one heating systems but we only go for the first one #proofOfConcept
    const heatingType = heatingInfo.records[0].fields.waermevers;

    // each of the following heating types are not possible
    // Wärmeverbunde, Wärmepumpen Erdsonde, "dezentral erneuerbar, ausserhalb bauzone"
    const heatingTypesNotPossible = [
      "Wärmeverbunde",
      "Wärmepumpen Erdsonde",
      "dezentral erneuerbar, ausserhalb bauzone",
    ];

    // following heating types are possible, but not done yet
    // Fernwärme Erweiterung, Fernwärme Endausbaupotenzial,  Fernwärme Ausbau 2020 bis 2025
    const heatingTypesPlaned = [
      "Fernwärme Erweiterung",
      "Fernwärme Endausbaupotenzial",
      "Fernwärme Ausbau 2020 bis 2025",
      "Anergie Ausbaugebiet (2019 bis 2023)",
      "Anergie Ausbaugebiet (2024 bis 2033)",
      "Anergie Ergänzungsgebiet",
      "Fernwärme Ergänzungsgebiet"
    ];

    // following heating types are already done, to connect to the heating network
    // Fernwärme in Betrieb
    const heatingTypesDone = ["Fernwärme in Betrieb"];

    console.log("heatingType", heatingType);

    if (heatingTypesNotPossible.includes(heatingType)) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      addChat(
        `Leider wird dein Objekt nicht an das Fernwärmenetz angeschlossen.`,
        "bot"
      );
    } else if (heatingTypesPlaned.includes(heatingType)) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      addChat(
        `Der Anschluss deines Objektes an das Fernwärmenetz ist geplan.`,
        "bot"
      );
    } else if (heatingTypesDone.includes(heatingType)) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      addChat(
        `Dein Objekt kann an das Fernwärmenetz angeschlossen werden.`,
        "bot"
      );
    } else {
      await new Promise((resolve) => setTimeout(resolve, 300));
      addChat(
        `Leider habe ich keine brauchbaren Informationen gefunden.`,
        "bot"
      );
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 300));
    addChat(
      "Leider habe ich keine brauchbaren Informationen gefunden.",
      "bot"
    );
  }
  // HEATING TYPE (Fernwärme) END

  await new Promise((resolve) => setTimeout(resolve, 300));
  addChat(
    "Ich hoffe ich konnte dir weiterhelfen. Wenn du noch Fragen hast, kannst du sie mir gerne stellen.",
    "bot"
  );

  await new Promise((resolve) => setTimeout(resolve, 300));
  addChat(
    "Die St.Galler Stadtwerke bieten auch eine Beratung an. Du kannst dich gerne an die Stadtwerke wenden.",
    "bot"
  );

};
</script>

<template>
  <div class="fixed bottom-4 right-4">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? '' : 'text-opacity-90'"
        class="group inline-flex items-center justify-center rounded-full bg-red-500 p-3 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
      >
        <ChatBubbleOvalLeftIcon class="h-8 w-8 text-white" />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute bottom-20 right-0 z-10 w-screen max-w-sm px-4 sm:px-0 lg:max-w-lg"
        >
          <div
            class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="relative bg-gray-50 p-4 font-bold">
              Erhalte die ersten Empfehlungen
            </div>

            <div id="chat" class="h-96 overflow-scroll bg-white p-4">
              <div class="flex w-full flex-col">
                <div v-for="(message, index) in chat" :key="`message-${index}`">
                  <ChatBotAnswer v-if="message.type === 'user'">{{
                    message.body
                  }}</ChatBotAnswer>
                  <ChatBotQuestion v-else>{{ message.body }}</ChatBotQuestion>
                </div>
              </div>
            </div>

            <div class="bg-gray-100 p-4">
              <div class="flex justify-end space-x-2">
                <button
                  v-if="questions[questionIndex].type === 'choice'"
                  v-for="(option, index) in questions[questionIndex].options"
                  :key="`option-${index}`"
                  class="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white"
                  @click="addAnswer(option)"
                >
                  {{ option.text }}
                </button>

                <form @submit.prevent="runSuggestionRequests()"
                  class="flex w-full"
                  v-if="questions[questionIndex].type === 'address'"
                >
                  <div class="grow px-4">
                    <input
                      class="w-full border-b-2 border-t-0 border-l-0 border-r-0 border-red-500 bg-transparent"
                      type="text"
                      placeholder="Adresse"
                      v-model="address"
                    />
                  </div>
                  <div>
                    <button
                      class="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white"
                      type="submit"
                    >
                      <PaperAirplaneIcon class="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>

    <!-- <div
      class="fixed h-96 w-96 -translate-x-full -translate-y-96 transform bg-red-900 text-white"
    >
      <div class="p-2">
        {{ answers }}
      </div>
    </div> -->
    <!-- 
    <button
      class="flex h-16 w-16 items-center justify-center rounded-full bg-red-500"
    >
      <ChatBubbleOvalLeftIcon class="h-8 w-8 text-white" />
    </button> -->
  </div>
</template>

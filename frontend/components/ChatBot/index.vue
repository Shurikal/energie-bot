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
    text: "Um welches Objekt handelt es sich?",
    type: "address",
  },
]);

// we need to save the answers so we can make suggestions
const answers = ref([]);

// adds one answer to the answers array and moves to the next question if there is one
const addAnswer = async (answer) => {
  answers.value.push(answer);
  questionIndex.value++;
  addChat(answer.text, "user");

  await new Promise((resolve) => setTimeout(resolve, 300));

  if (questionIndex.value < questions.value.length) {
    addChat(questions.value[questionIndex.value].text, "bot");
  }
};

// get the address that has been input by the user
const address = ref("");

const getLv95Coords = async (address) => {
  const response = await fetch(
    `https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${address}&type=locations&origins=address&limit=1&sr=2056`
  );
  const data = await response.json();
  return data.results[0].attrs;
};

const getHeatingInfo = async (lat,lon) => {
  const dist = 1;

  const url = `https://daten.stadt.sg.ch/api/records/1.0/search/?dataset=warmeversorgung&q=&facet=waermevers&geofilter.distance=${lat}%2C${lon}%2C${dist}`

  const response = await fetch(url);
  const data = await response.json();
  return data
}

const getSolarInfo = async(x,y) => {
  const url = `https://api3.geo.admin.ch/rest/services/all/MapServer/identify?geometry=${y},${x}&geometryFormat=geojson&geometryType=esriGeometryPoint&imageDisplay=1680,388,96&lang=en&layers=all:ch.bfe.solarenergie-eignung-daecher&limit=10&mapExtent=2745356.382965297,1254042.6972188372,2746005.609812927,1254192.6377050756&returnGeometry=true&sr=2056&tolerance=20`

  const response = await fetch(url);
  const data = await response.json();
  return data
}

const runSuggestionRequests = async () => {
  addAnswer({
    text: address.value,
    value: address.value,
  });

  loading.value = true;

  const coords = await getLv95Coords(address.value);
  console.log('coords', coords);
  const heatingInfo = await getHeatingInfo(coords.lat, coords.lon);
  console.log('heatingInfo', heatingInfo);
  const solarInfo = await getSolarInfo(coords.x, coords.y);
  console.log('solarInfo', solarInfo);



  loading.value = false;


  await new Promise((resolve) => setTimeout(resolve, 3000));
  loading.value = false;
  addChat("Hier sind deine Vorschläge:", "bot");
};


// initial chat message with question from "bot"
const sendChat = () => {
  addChat(
    "Hallo, kann ich dir helfen schnell und einfach Empfehlungen zu geben?",
    "bot"
  );
  addChat(questions.value[questionIndex.value].text, "bot");
};

sendChat();



// TESTING
address.value = "St. Leonhard-Strasse 45, St. Gallen"
runSuggestionRequests();
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

            <div class="h-96 overflow-scroll bg-white p-4">
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

                <div class="flex w-full" v-if="questions[questionIndex].type === 'address'">
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
                      @click="runSuggestionRequests({ text: address })"
                    >
                      <PaperAirplaneIcon class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>

    <div class="fixed transform -translate-x-full h-96 -translate-y-96 w-96 bg-red-900 text-white">
      <div class="p-2">
        {{ answers}}
      </div>
    </div>
    <!-- 
    <button
      class="flex h-16 w-16 items-center justify-center rounded-full bg-red-500"
    >
      <ChatBubbleOvalLeftIcon class="h-8 w-8 text-white" />
    </button> -->
  </div>
</template>

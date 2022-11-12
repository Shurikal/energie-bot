<script setup>
import { ArrowLongRightIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div>
    <header class="header flex items-center py-8">
      <div class="container mx-auto grid grid-cols-3">
        <div class="col-span-2 flex flex-col pr-6">
          <h1 class="mb-8 text-2xl font-bold">
            Einfach und verständliche Empfehlung zu Heizung und Energie
          </h1>
          <p class="mb-8 text-lg">
            Wir helfen dir, die richtige Heizung für dein Haus, deine Immobilie
            zu finden oder was du als Mieter bewirken kannst.
          </p>
          <p class="mb-4">
            <NuxtLink
              class="inline-flex rounded-full border-2 border-black bg-white py-1 px-4 text-sm font-bold text-black transition-all duration-300 hover:bg-black hover:text-white"
              to="/"
              >Beratungsgespräch mit SGSW
              <ArrowLongRightIcon class="ml-6 h-6 w-6"
            /></NuxtLink>
          </p>
          <p>
            <NuxtLink
              class="inline-flex rounded-full border-2 border-black bg-white py-1 px-4 text-sm font-bold text-black transition-all duration-300 hover:bg-black hover:text-white"
              to="/"
              >Erste Vorschläge erhalten
              <ArrowLongRightIcon class="ml-6 h-6 w-6"
            /></NuxtLink>
          </p>
        </div>
        <div>
          <img src="~/assets/img/hero.png" alt="hero" class="w-full" />
        </div>
      </div>
    </header>

    <section class="bg-black py-16 text-white">
      <div class="container mx-auto">
        <h2 class="mb-8 w-2/3 text-lg">
          Warum sind viele Dienstleister nicht in der Lage eine Neutralität zu
          garantieren?
        </h2>
        <p class="mb-12 w-2/3">
          Die meisten Dienstleister sind an bestimmte Hersteller gebunden und
          können daher nicht neutral beraten. Die Stadt berät unabhängig und
          neutral.
        </p>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto">
        <h2 class="mb-8 text-lg">Und was können wir für dich tun?</h2>

        <div class="grid grid-cols-3 gap-5">
          <Feature>
            <FeatureTitle> Genaue Informationen </FeatureTitle>
            <FeatureBody>
              Wir geben dir eine genaue und verständliche Empfehlung zu deiner
              Heizung und Energie.
            </FeatureBody>
          </Feature>

          <Feature>
            <FeatureTitle>Sonnenstand</FeatureTitle>
            <FeatureBody>
              Wir können dir genau sagen, wie viel Sonne dein Haus bekommt und
              wie viel du damit sparen kannst.
            </FeatureBody>
          </Feature>

          <Feature>
            <FeatureTitle>Infrastruktur</FeatureTitle>
            <FeatureBody>
              Ob Gas, Strom oder Fernwärme, wir können dir genau sagen, was
              verfügbar ist und was du nutzen kannst.
            </FeatureBody>
          </Feature>

          <Feature>
            <FeatureTitle>Förderungen</FeatureTitle>
            <FeatureBody>
              Wir können dir genau sagen, welche Förderungen du nutzen kannst
              und wie viel unterstützung du erhalten würdest.
            </FeatureBody>
          </Feature>

          <Feature>
            <FeatureTitle>Informationen aus erster Hand</FeatureTitle>
            <FeatureBody>
              Erklärungen sind nicht immer verständlich. Wir können dir
              Informationen aus erster Hand geben.
            </FeatureBody>
          </Feature>

          <Feature>
            <FeatureTitle>Deine Bedürfnisse</FeatureTitle>
            <FeatureBody>
              Egal ob Zukunftsorientiert, Nachhaltig oder mit einem geringeren
              Investment, wir können dir genau sagen, was für dich am besten
              ist.
            </FeatureBody>
          </Feature>
        </div>
      </div>
    </section>

    <section class="border-y-2 border-gray-200 py-16">
      <div class="container mx-auto">
        <h2 class="mb-8 text-lg">Beispiele für Erfolgreiche Projekte</h2>

        <div class="grid grid-cols-2 gap-8">
          <div class="overflow-hidden rounded-md border-2 border-black">
            <img
              src="~/assets/img/waermepumpe.jpg"
              class="aspect-3/2 object-cover"
              alt=""
            />

            <div class="p-4">
              <h3 class="mb-4 text-base">Leo & Co Coworking St.Gallen</h3>

              <p class="mb-3">
                Neue Heizung und Energie für das Coworking in St.Gallen.
              </p>

              <ul class="mb-3">
                <li>
                  <span class="font-bold text-green-500">-13%</span>
                  Energiekosten
                </li>
                <li>
                  <span class="font-bold text-green-500">-57% </span>CO2
                  Emissionen
                </li>
                <li>
                  <span class="font-bold text-green-500">-49%</span> Heizkosten
                </li>
              </ul>

              <p class="mb-3">
                <span class="font-bold">-6'321.00 CHF</span> / Jahr einsparen
              </p>

              <p><span class="font-bold">38'000 CHF</span> Investition</p>
            </div>
          </div>

          <div class="overflow-hidden rounded-md border-2 border-black">
            <img
              src="~/assets/img/waermepumpe.jpg"
              class="aspect-3/2 object-cover"
              alt=""
            />

            <div class="p-4">
              <h3 class="mb-4 text-base">Leo & Co Coworking St.Gallen</h3>

              <p class="mb-3">
                Neue Heizung und Energie für das Coworking in St.Gallen.
              </p>

              <ul class="mb-3">
                <li>
                  <span class="font-bold text-green-500">-13%</span>
                  Energiekosten
                </li>
                <li>
                  <span class="font-bold text-green-500">-57% </span>CO2
                  Emissionen
                </li>
                <li>
                  <span class="font-bold text-green-500">-49%</span> Heizkosten
                </li>
              </ul>

              <p class="mb-3">
                <span class="font-bold">-6'321.00 CHF</span> / Jahr einsparen
              </p>

              <p><span class="font-bold">38'000 CHF</span> Investition</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto">
        <h2 class="mb-8 w-2/3 text-xl">
          Diese Fragen könnten klarheit schaffen, was du von uns erwarten
          kannst.
        </h2>

        <Faq />
      </div>
    </section>

    <section class="py-16 bg-gray-200">
      <div class="container mx-auto">
        <div class="grid grid-cols-2 gap-8">
          <div class="flex flex-col justify-between">
            <div>
              <h2 class="mb-8 text-lg">
                Unsere Beratung ist kostenlos und neutral. Ganz für dich, 
                deine Bedürfnisse und Möglichkeiten.
              </h2>
            </div>
            <p class="mb-4">
              <NuxtLink
                class="inline-flex rounded-full border-2 border-black bg-white py-1 px-4 text-sm font-bold text-black transition-all duration-300 hover:bg-black hover:text-white"
                to="/"
                >Beratungsgespräch mit SGSW
                <ArrowLongRightIcon class="ml-6 h-6 w-6"
              /></NuxtLink>
            </p>
          </div>
          <div class="flex flex-col justify-between">
            <div>
              <h2 class="mb-8 text-lg">
                Nutze unseren Chat Bot und erhalte schnell, einfach und unkompliziert die wichtigsten Möglichkeiten.
              </h2>
            </div>
            <p class="mb-4">
              <NuxtLink
                class="inline-flex rounded-full border-2 border-black bg-white py-1 px-4 text-sm font-bold text-black transition-all duration-300 hover:bg-black hover:text-white"
                to="/"
                >Erste Vorschläge erhalten
                <ArrowLongRightIcon class="ml-6 h-6 w-6"
              /></NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto">
        <h2 class="text-lg flex justify-center mb-8">
          <img src="~/assets/img/logo.png" class="max-h-12" alt="St.Galler Stadtwerke">
        </h2>
        <p class="w-2/3 mx-auto">Wie sieht unsere Energiezukunft aus? Wir haben die Antwort. Wer sich mit der Zukunft beschäftigt, möchte Klarheit. Gemeinsam mit Dir finden wir deine bestmögliche Lösung.</p>
      </div>
    </section>
  </div>
</template>

<style>
.header {
  height: calc(100vh - 4rem);
}
</style>

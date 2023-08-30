const colors = require('tailwindcss/colors') // eslint-disable-line

const meta = {
  langsjon_jarlasjon: {
    description:
      'This route joins up multiple smaller fairly unknown paths resulting in a nice 5k with two fun climbs; the first one up the hill next to Långsjön and the other one at Fannydalsplatån.',
    rating: 4,
    location: 'Nacka · Stockholm',
    color: colors.yellow[400],
    added: '2020-03-25',
  },
  langsjon: {
    rating: 4,
    location: 'Långsjön · Nacka',
    color: colors.red[400],
    description:
      "A short swimrun loop in and around Långsjön. 4 run sections on trails and gravel roads with one nice climb and 3 swims around 250-300 meters each. \nStart at the north-western part of the lake and run towards the beach, from the beach swim east aiming at the small beach/outdoor gym. \nFollow the gravel road until a cliff appears on the right. Swim along the edge of the lake until the next cliff appears. Follow the trail back around 500 meters until you see a trail going up the mountain. Take right at the peak and follow the trail until you come down to the water. \nSwim towards the beach, and then follow the road then make a U-turn to a path 'above' the regular trail, follow it until the end and you completed one loop! \nRepeat as many times you want.",
    added: '2020-06-13',
    type: 'swimrun',
  },
  tortona_one: {
    description:
      'With a mix of mountains and pavement, this route starts at San Augustin and goes around the goat cheese farm "🐐 Quesería la Gloria". The trail part starts by the end of the parking lot of Hotel Gloria Palace. Pass through the tunnel and make a sharp left after ~100 meters on a small steep trail (270m at 22% avg grade). After this hill the trail gets easier with a steady climb towards the goat farm. Take a right after passing the farm which will bring you down towards the ocean (with amazing views). After the descent simply follow the paved road back towards San Augustin.',
    rating: 14,
    location: 'San Augustin · Gran Canaria',
    color: colors.yellow[500],
    added: '2023-08-30',
    points: [
      {
        lat: 44.9004100,
        lng: 8.8835000,
        description: '<strong>Great viewpoint</strong><p>Great view</p>',
      },
    ],
  },
  duvnas_utskog: {
    description:
      'A fun loop crossing through parts of Nyckelviken on the way towards Duvnäs utskog and Skuru. Some really nice hills (almost 20% gradients) and amazing views over the ocean. In the Kungshamn and Duvnäs utskog area there are short stretches of pavement, but its worth it to access the trails! Its recommended to bring your phone or load the gpx on you watch as there are tons of small trails just before arriving at Kungshamn and easy to run the wrong one.',
    rating: 4,
    location: 'Nacka · Stockholm',
    color: colors.green[500],
    added: '2023-01-12',
    points: [
      {
        lat: 59.33477309132903,
        lng: 18.21082337704159,
        description: '<strong>Great viewpoint</strong><p>Great view over the ocean where you can spot big boats</p>',
      },
      { lat: 59.32682096582746, lng: 18.217041682304853, description: 'Long stairs' },
    ],
  },
}

module.exports = { meta }

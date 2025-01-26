const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  let latitude = 9.0079232;
  let longitude = 38.7678208;
  await prisma.restaurant.createMany({
    data: [
      {
        id: 1,
        name: "Abebe's Kitchen",
        latitude: 9.008,
        longitude: 38.7675,
        address: "Addis Ababa, Bole Road, Near Bole Medhanealem Church",
        openingHours: "8:00 AM - 10:00 PM",
        rating: 4.5,
      },
      {
        id: 2,
        name: "Doro Wot Restaurant",
        latitude: 9.0065,
        longitude: 38.768,
        address: "Addis Ababa, Bole, Near Edna Mall",
        openingHours: "10:00 AM - 11:00 PM",
        rating: 4.0,
      },

      // Within 1 km
      {
        id: 3,
        name: "Meskel Square Cafe",
        latitude: 9.005,
        longitude: 38.757,
        address: "Addis Ababa, Meskel Square",
        openingHours: "9:00 AM - 9:00 PM",
        rating: 4.2,
      },
      {
        id: 4,
        name: "Kebede's Coffee",
        latitude: 9.0075,
        longitude: 38.759,
        address: "Addis Ababa, Bole, Near Ethiopian Airlines HQ",
        openingHours: "7:00 AM - 8:00 PM",
        rating: 4.3,
      },
      {
        id: 5,
        name: "Taste of Ethiopia",
        latitude: 9.0045,
        longitude: 38.762,
        address: "Addis Ababa, Kazanchis, Near Friendship Square",
        openingHours: "9:00 AM - 10:00 PM",
        rating: 4.4,
      },

      // Within 3 km
      {
        id: 6,
        name: "The Blue Nile",
        latitude: 9.013,
        longitude: 38.771,
        address: "Addis Ababa, Kera, Near Kera Market",
        openingHours: "8:00 AM - 11:00 PM",
        rating: 4.6,
      },
      {
        id: 7,
        name: "Café de Paris",
        latitude: 9.015,
        longitude: 38.764,
        address: "Addis Ababa, Arada, Near Addis Ababa University",
        openingHours: "10:00 AM - 9:00 PM",
        rating: 4.7,
      },
      {
        id: 8,
        name: "Lalibela Restaurant",
        latitude: 9.002,
        longitude: 38.765,
        address: "Addis Ababa, Lideta, Near Lideta Church",
        openingHours: "9:00 AM - 10:00 PM",
        rating: 4.8,
      },
      {
        id: 9,
        name: "Walia Restaurant",
        latitude: 9.019,
        longitude: 38.772,
        address: "Addis Ababa, Bole, Near Bole International Airport",
        openingHours: "24 Hours",
        rating: 4.2,
      },

      // Within 5 km
      {
        id: 10,
        name: "Café Kulture",
        latitude: 9.03,
        longitude: 38.78,
        address: "Addis Ababa, Kazanchis, Near Radisson Blu",
        openingHours: "8:00 AM - 11:00 PM",
        rating: 4.5,
      },
      {
        id: 11,
        name: "Sishu Restaurant",
        latitude: 9.025,
        longitude: 38.785,
        address: "Addis Ababa, CMC, Near CMC Roundabout",
        openingHours: "10:00 AM - 10:00 PM",
        rating: 4.1,
      },
      {
        id: 12,
        name: "Bole Bistro",
        latitude: 9.018,
        longitude: 38.79,
        address: "Addis Ababa, Bole, Near Friendship Hotel",
        openingHours: "9:00 AM - 11:00 PM",
        rating: 4.3,
      },
      {
        id: 13,
        name: "Mama Mela",
        latitude: 9.022,
        longitude: 38.795,
        address: "Addis Ababa, CMC, Near CMC Park",
        openingHours: "9:00 AM - 9:00 PM",
        rating: 4.6,
      },
      {
        id: 14,
        name: "Addis Ababa Grill",
        latitude: 9.028,
        longitude: 38.8,
        address: "Addis Ababa, Bole, Near Ethiopia Hotel",
        openingHours: "8:00 AM - 10:00 PM",
        rating: 4.4,
      },
      {
        id: 15,
        name: "Haileselassie Restaurant",
        latitude: 9.021,
        longitude: 38.805,
        address: "Addis Ababa, Near Haileselassie Church",
        openingHours: "10:00 AM - 10:00 PM",
        rating: 4.5,
      },

      // Within 10 km
      {
        id: 16,
        name: "Mamma Mia",
        latitude: 9.045,
        longitude: 38.825,
        address: "Addis Ababa, Near Bole Medhanealem",
        openingHours: "10:00 AM - 11:00 PM",
        rating: 4.2,
      },
      {
        id: 17,
        name: "Ethiopian Traditional Restaurant",
        latitude: 9.05,
        longitude: 38.83,
        address: "Addis Ababa, Near Meskel Square",
        openingHours: "9:00 AM - 10:00 PM",
        rating: 4.7,
      },
      {
        id: 18,
        name: "Taste of the Nile",
        latitude: 9.06,
        longitude: 38.84,
        address: "Addis Ababa, Near Merkato",
        openingHours: "8:00 AM - 10:30 PM",
        rating: 4.4,
      },
      {
        id: 19,
        name: "Bole Bistro & Lounge",
        latitude: 9.065,
        longitude: 38.845,
        address: "Addis Ababa, Near Bole International Airport",
        openingHours: "10:00 AM - 12:00 AM",
        rating: 4.6,
      },

      // Within 15 km
      {
        id: 20,
        name: "Kebena Restaurant",
        latitude: 9.08,
        longitude: 38.85,
        address: "Addis Ababa, Near Kebena Church",
        openingHours: "8:00 AM - 11:00 PM",
        rating: 4.3,
      },
      {
        id: 21,
        name: "Bole Chaka",
        latitude: 9.09,
        longitude: 38.86,
        address: "Addis Ababa, Near Bole Chaka",
        openingHours: "9:00 AM - 10:00 PM",
        rating: 4.5,
      },
      {
        id: 22,
        name: "Dawit Restaurant",
        latitude: 9.095,
        longitude: 38.87,
        address: "Addis Ababa, Near Addis Ababa University",
        openingHours: "10:00 AM - 11:00 PM",
        rating: 4.4,
      },
      {
        id: 23,
        name: "Tena Yistilign",
        latitude: 9.1,
        longitude: 38.88,
        address: "Addis Ababa, Near Tena Yistilign Church",
        openingHours: "9:00 AM - 10:00 PM",
        rating: 4.6,
      },
      {
        id: 24,
        name: "Awash Restaurant",
        latitude: 9.105,
        longitude: 38.89,
        address: "Addis Ababa, Near Awash River",
        openingHours: "8:00 AM - 10:00 PM",
        rating: 4.5,
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

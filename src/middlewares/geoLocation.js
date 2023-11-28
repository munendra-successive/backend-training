import { SuperfaceClient } from "@superfaceai/one-sdk";

// Superface Client Api
const sdk = new SuperfaceClient();

async function run(ip) {
  const profile = await sdk.getProfile("address/ip-geolocation@1.0.1");
  const result = await profile.getUseCase("IpGeolocation").perform(
    {
      ipAddress: ip,
    },
    {
      provider: "ipdata",
      security: {
        apikey: {
          apikey: "9a511b6fc8334e1852cfbbd4ff3f1af3c42ed6abc75e96a1648b969a",
        },
      },
    }
  );

  try {
    const data = result.unwrap();
    return data;
  } catch (error) {
    console.error(error);
  }
}


const geoLocation = async (req, res, next) => {
  //   const ip = "45.249.87.217";
  //   const ip = "42.108.5.67";
  const ip = "45.249.87.217";
  const response = await run(ip);
  if (response.addressRegion !== "Delhi") {
    return res.status(403).send("User is not from the expected region");
  }
  console.log("user from expected region");
  next();
};
export default geoLocation;

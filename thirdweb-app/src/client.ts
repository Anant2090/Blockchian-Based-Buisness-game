import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "7b01941a341a62ac71ad7c1ad7a3f491";

export const client = createThirdwebClient({
  clientId: clientId,
});

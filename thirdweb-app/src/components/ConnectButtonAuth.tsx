import { ConnectButton } from "thirdweb/react";
import { client } from "../lib/client";
import { LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";
import { get, post } from "../lib/api";
import { sepolia } from "thirdweb/chains";

export default function ConnectButtonAuth() {
  return (
    <ConnectButton
      theme="dark"
      client={client}
      
        // Looking to authenticate with account abstraction enabled? Uncomment the following lines:
       
        // accountAbstraction={{
        //  chain: sepolia,
        //  factoryAddress: "0x74D677Db3a132F68fC630E1AAEB447cE5F2da6BC",
        //  gasless: true,
        // }}
      
      auth={{
        /**
         * `getLoginPayload` should return a LoginPayload object.
         * This can be generated on the server with the generatePayload method.
         */
        getLoginPayload: async (params: { address: string }): Promise<LoginPayload> => {
          console.log("hi")
          return get({
            url: "http://localhost:3000/login",
            params: {
              address: params.address,
              chainId: sepolia.id.toString(),
            },
          });
        },
        /**
         * `doLogin` performs any logic necessary to log the user in using the signed payload.
         * In this case, this means sending the payload to the server for it to set a JWT cookie for the user.
         */
        doLogin: async (params: VerifyLoginPayloadParams) => {
          await post({
            url: "http://localhost:3000/login",
            params,
          });
        },
        /**
         * `isLoggedIn` returns true or false to signal if the user is logged in.
         * Here, this is done by calling the server to check if the user has a valid JWT cookie set.
         */
        isLoggedIn: async () => {
          return await get({
            url: "http://localhost:3000/isLoggedIn",
          });
        },
        /**
         * `doLogout` performs any logic necessary to log the user out.
         * In this case, this means sending a request to the server to clear the JWT cookie.
         */
        doLogout: async () => {
          await post({
            url: "http://localhost:3000/logout",
          });
        },
      }}
    />
  );
}

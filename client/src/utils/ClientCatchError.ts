import axios from "axios";

const ClientCatchError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return console.error(error.response?.data.message || error.message);
  }

  if (error instanceof Error) {
    return console.error(error.message);
  }
  console.error("Something went wrong");
};

export default ClientCatchError;

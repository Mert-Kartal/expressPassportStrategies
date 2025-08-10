import { app } from "./config";
import "./auth/local-strategy";
import "./auth/jwt-strategy";
import "./auth/google-strategy";

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

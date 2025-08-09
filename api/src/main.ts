import { app } from "./config";
import "./auth/strategy";
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

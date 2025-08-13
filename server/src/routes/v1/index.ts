import classesRoutes from "./classes.js";
import studentsRoutes from "./students.js";
import periodsRoutes from "./periods.js";
import attendanceRoutes from "./attendance.js";

export default async function v1Router(app: any) {
  //TODO: set prefix for register and remove from routes
  app.register(classesRoutes);
  app.register(studentsRoutes);
  app.register(periodsRoutes);
  app.register(attendanceRoutes);
}

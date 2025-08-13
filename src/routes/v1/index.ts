import classesRoutes from "./classes.js";
import studentsRoutes from "./students.js";
import periodsRoutes from "./periods.js";
import attendanceRoutes from "./attendance.js";

export default async function v1Router(app: any) {
  app.register(classesRoutes, { prefix: "/classes" });
  app.register(studentsRoutes, { prefix: "/students" });
  app.register(periodsRoutes, { prefix: "/periods" });
  app.register(attendanceRoutes, { prefix: "/attendance" });
}

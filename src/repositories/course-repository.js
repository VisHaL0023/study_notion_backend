import { Courses } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class CoursesRepository extends CrudRepository {
    constructor() {
        super(Courses);
    }
}

export default CoursesRepository;

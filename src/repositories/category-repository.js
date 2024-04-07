import { Category } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class CategoryRepository extends CrudRepository {
    constructor() {
        super(Category);
    }
}

export default CategoryRepository;

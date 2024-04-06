import { Category } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class CategoryRepository extends CrudRepository {
    constructor() {
        super(Category);
    }

    async findByCategory(data) {
        try {
            const courses = await Category.findOne(data);
            return courses;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default CategoryRepository;

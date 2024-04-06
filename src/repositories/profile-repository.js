import { Profile } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class ProfileRepository extends CrudRepository {
    constructor() {
        super(Profile);
    }
}

export default ProfileRepository;

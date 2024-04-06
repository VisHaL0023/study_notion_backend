import { OTP } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class OTPRepository extends CrudRepository {
    constructor() {
        super(OTP);
    }
}

export default OTPRepository;
